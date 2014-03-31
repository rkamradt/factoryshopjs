var FactoryShopFactory = {
    create: function(overwrites) {
        var defaults = { name: "shop" };
        var values = Object.extend(defaults, overwrites);
        return FactoryShop.create(values.name);
    }
};

Object.extend = function(obj, props) {
    for(var prop in props) { obj[prop] = props[prop]; }
    return obj;
};
xdescribe('Factory shop', function() {
    it('should return have a name', function() {
        var name = 'shop';
        var instance = FactoryShopFactory.create({name: name});
        expect(instance.name()).toEqual(name);
    });
    it('should be able to add a role', function() {
        var instance = FactoryShopFactory.create();
        var roles = instance.roles();
        expect(roles.indexOf("role1")).toEqual(-1);
        instance.addRole("role1");
        roles = instance.roles();
        expect(roles.indexOf("role1")).not.toEqual(-1);
    });
    it('should be able to delete a role', function() {
        var instance = FactoryShopFactory.create();
        var roles = instance.roles();
        expect(roles.indexOf("role1")).toEqual(-1);
        instance.addRole("role1");
        roles = instance.roles();
        expect(roles.indexOf("role1")).not.toEqual(-1);
        instance.deleteRole("role1");
        expect(roles.indexOf("role1")).toEqual(-1);
    });
    it('should be able to list its required roles', function() {
        var instance = FactoryShopFactory.create();
        instance.addRole("role1");
        instance.addRole("role2");
        var roles = instance.roles();
        expect(roles.length).toEqual(2);
        expect(roles.indexOf("role1")).not.toEqual(-1);
        expect(roles.indexOf("role2")).not.toEqual(-1);
    });
    it('should be able to add a machine', function() {
        var instance = FactoryShopFactory.create();
        var machines = instance.machines();
        expect(machines.indexOf("machine1")).toEqual(-1);
        instance.addMachine("machine1");
        machines = instance.machines();
        expect(machines.indexOf("machine1")).not.toEqual(-1);
    });
    it('should be able to delete a machine', function() {
        var instance = FactoryShopFactory.create();
        var machines = instance.machines();
        expect(machines.indexOf("machine1")).toEqual(-1);
        instance.addMachine("machine1");
        machines = instance.machines();
        expect(machines.indexOf("machine1")).not.toEqual(-1);
        instance.deleteMachine("machine1");
        expect(machines.indexOf("machine1")).toEqual(-1);
    });
    it('should be able to list its required machines', function() {
        var instance = FactoryShopFactory.create();
        instance.addMachine("machine1");
        instance.addMachine("machine2");
        var machines = instance.machines();
        expect(machines.length).toEqual(2);
        expect(machines.indexOf("machine1")).not.toEqual(-1);
        expect(machines.indexOf("machine2")).not.toEqual(-1);
    });
    it('should be able to add a process', function() {
        var instance = FactoryShopFactory.create();
        var processes = instance.processes();
        expect(processes.indexOf("process1")).toEqual(-1);
        instance.addProcess("process1");
        processes = instance.processes();
        expect(processes.indexOf("process1")).not.toEqual(-1);
    });
    it('should be able to delete a process', function() {
        var instance = FactoryShopFactory.create();
        var processes = instance.processes();
        expect(processes.indexOf("process1")).toEqual(-1);
        instance.addProcess("process1");
        processes = instance.processes();
        expect(processes.indexOf("process1")).not.toEqual(-1);
        instance.deleteProcess("process1");
        expect(processes.indexOf("process1")).toEqual(-1);
    });
    it('should be able to list its available processes', function() {
        var instance = FactoryShopFactory.create();
        instance.addProcess("process1");
        instance.addProcess("process2");
        var processes = instance.processes();
        expect(processes.length).toEqual(2);
        expect(processes.indexOf("process1")).not.toEqual(-1);
        expect(processes.indexOf("process2")).not.toEqual(-1);
    });
    it('should be able a process against an item', function() {
        var instance = FactoryShopFactory.create();
        try {
            instance.runProcessOnItem("process", "item");
        } catch (error) {
            expect(error.message).toEqual("process 'process' is not available at this shop");
        }
        instance.addProcess("process");
        instance.runProcessOnItem("process", "item");
    });
});