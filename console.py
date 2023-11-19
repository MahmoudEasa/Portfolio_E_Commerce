#!/usr/bin/python3

"""Program console.py that contains the entry point of the command interpreter
"""
from models.base_model import BaseModel
from models import storage
from models.user import User
from models.buy import Buy
from models.cart import Cart
from models.item import Item

from cmd import Cmd
import re
import shlex  # for splitting the line along spaces except in double quotes



class ECommerceCommand(Cmd):
    """Class ECommerce Command
    """
    prompt = "(ecommerce) "

    all_models = {
            "BaseModel": BaseModel,
            "User": User,
            "Buy": Buy,
            "Cart": Cart,
            "Item": Item,
            }

    def emptyline(self):
        """Empty line + ENTER shouldn’t execute anything"""
        pass

    def do_quit(self, arg):
        """Exit the program"""
        return (True)

    def do_EOF(self, arg):
        """Exit the program"""
        print()
        return (True)

    def help_quit(self):
        """Help for Quit Command"""
        print("Quit command to exit the program\n")

    def help_EOF(self):
        """Help for EOF Command"""
        print("EOF Command to exit the program\n")


    def _key_value_parser(self, args):
        """creates a dictionary from a list of strings"""
        new_dict = {}
        for arg in args:
            if "=" in arg:
                kvp = arg.split('=', 1)
                key = kvp[0]
                value = kvp[1]
                if value[0] == value[-1] == '"':
                    value = shlex.split(value)[0].replace('_', ' ')
                else:
                    try:
                        value = int(value)
                    except:
                        try:
                            value = float(value)
                        except:
                            continue
                new_dict[key] = value
        return new_dict

    def do_create(self, arg):
        """Creates a new instance of BaseModel,
            saves it (to the DB) and prints the id

            Ex:
                $ create BaseModel
        """
        args = arg.split()
        if len(args) == 0:
            print("** class name missing **")
        elif args[0] not in ECommerceCommand.all_models.keys():
            print("** class doesn't exist **")
        else:
            new_dict = self._key_value_parser(args[1:])
            new_model = ECommerceCommand.all_models[args[0]](**new_dict)
            new_model.save()
            print(new_model.id)

    def do_show(self, arg):
        """Prints the string representation of an instance
            based on the class name and id

            Ex:
                $ show BaseModel 1234-1234-1234
        """
        args = arg.split()
        # all_instances = storage.all()
        args_len = len(args)
        instance_id = None

        if args_len == 2:
            class_id = re.sub(r"['\"]", r"", args[1])
            instance_id = args[0] + '.' + class_id

        if not arg:
            print("** class name missing **")
            return
        elif args[0] not in ECommerceCommand.all_models.keys():
            print("** class doesn't exist **")
            return
        elif args_len == 1:
            print("** instance id missing **")
            return
        instance = storage.get(args[0], args[1])
        if instance.count() == 0:
            print("** no instance found **")
        else:
            """ print(all_instances[instance_id]) """
            for row in instance.all():
                print(row.username)
                print(row.email)
                print(row.password)
                print(row.phone)
                print(row.address)
                print(row.is_admin)

    def do_destroy(self, arg):
        """Deletes an instance based on the class name
            and id (save the change into the JSON file)

            Ex:
                $ destroy BaseModel 1234-1234-1234
        """
        args = arg.split()
        all_instances = storage.all()
        args_len = len(args)
        instance_id = None

        if args_len == 2:
            class_id = re.sub(r"['\"]", r"", args[1])
            instance_id = args[0] + '.' + class_id

        if not arg:
            print("** class name missing **")
        elif args[0] not in ECommerceCommand.all_models.keys():
            print("** class doesn't exist **")
        elif args_len == 1:
            print("** instance id missing **")
        elif instance_id not in all_instances.keys():
            print("** no instance found **")
        else:
            del all_instances[instance_id]
            storage.save()

    def do_all(self, arg):
        """Prints all string representation of all instances
            based or not on the class name

            Ex:
                $ all BaseModel
                $ all
        """
        all_instances = storage.all()
        result = []

        if arg:
            if arg in ECommerceCommand.all_models.keys():
                for key, val in all_instances.items():
                    if arg == val.__class__.__name__:
                        result.append(str(val))
            else:
                print("** class doesn't exist **")
                return
        else:
            for key, val in all_instances.items():
                result.append(str(val))

        print(result)

    def do_update(self, arg):
        """Updates an instance based on the class name and id by adding
            or updating attribute (save the change into the JSON file)

            Usage:
                update <class name> <id> <attribute name> "<attribute value>"

            Ex:
                $ update BaseModel 1234-1234-1234 email "aibnb@mail.com"
        """
        rex = r'^(\S+)? ?(\S+)? ?(\S+)? ?(\S+ ?\S+)?'
        match = re.search(rex, arg)
        class_name = match.group(1)
        class_id = match.group(2)
        attr_name = match.group(3)
        attr_val = match.group(4)
        all_instances = storage.all()
        instance_id = None

        if attr_val:
            if attr_val[0] in ['"', "'"]:
                attr_val = attr_val[1:-1]
            elif attr_val in ['True', 'true']:
                attr_val = True
            elif attr_val in ['False', 'false']:
                attr_val = False
            elif attr_val.isdigit():
                attr_val = int(attr_val)
            else:
                try:
                    attr_val = float(attr_val)
                except ValueError:
                    pass

        if class_id:
            class_id = re.sub(r"['\"]", r"", class_id)

        if class_name and class_id:
            instance_id = class_name + '.' + class_id

        if not class_name:
            print("** class name missing **")
        elif class_name not in ECommerceCommand.all_models.keys():
            print("** class doesn't exist **")
        elif not class_id:
            print("** instance id missing **")
        elif instance_id not in all_instances.keys():
            print("** no instance found **")
        elif not attr_name:
            print("** attribute name missing **")
        elif attr_val is None:
            print("** value missing **")
        else:
            attr_name = re.sub(r"['\"]", r'', attr_name)
            if attr_name not in ["id", "created_at", "updated_at"]:
                setattr(all_instances[instance_id], attr_name, attr_val)
                all_instances[instance_id].save()

    def do_count(self, arg):
        """Retrieve the number of instances of a class
        """
        if not arg:
            print(storage.count())
            return
            print("** class name missing **")
        elif arg not in ECommerceCommand.all_models.keys():
            print("** class doesn't exist **")
        else:
            print(storage.count(arg))
            return
            count = 0
            all_instancess = storage.all()
            for key, val in all_instancess.items():
                if val.__class__.__name__ == arg:
                    count += 1
            print(count)

    def default(self, line):
        """Default if command invalid
        """
        cmds = {
                "all": self.do_all,
                "count": self.do_count,
                "show": self.do_show,
                "destroy": self.do_destroy,
                "update": self.do_update,
                }

        rex = r"^(\S+)\.(\S+)\((.*)?\)"
        match = re.search(rex, line)
        if match:
            class_name = match.group(1)
            cmd = match.group(2)
            group3 = match.group(3)
            has_dict = None

            if group3:
                has_dict = re.search('{', group3)

            if cmd == "update" and has_dict:
                split_group = group3.split("{")
                try:
                    class_id = re.sub(r', ', r'', split_group[0])
                    args = split_group[1].replace("}", "").split(",")
                    for arg in args:
                        arg = arg.replace(":", "")
                        arg = arg.strip()
                        command = class_name + ' ' + class_id + ' ' + arg
                        command = command.replace(',', '')
                        cmds['update'](command)
                except IndexError:
                    pass
            else:
                if group3:
                    args = group3.replace(',', "")
                    if args:
                        class_name += ' ' + args
                        class_name = class_name.replace(":", "")

                try:
                    cmds[cmd](class_name)
                except KeyError:
                    print(f"*** Unknown syntax: {line}")
        else:
            print(f"*** Unknown syntax: {line}")


if __name__ == '__main__':
    ECommerceCommand().cmdloop()
