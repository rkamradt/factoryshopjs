"use scrict"

var FactoryShop = {
    create: function(name) {
        return Object.create(FactoryShop).init(name);
    },
    init: function(name) {
        this._name = name;
        this._roles = new Array();
        this._machines = new Array();
        this._processes = new Array();
        return this;
    },
    name: function() { return this._name; },
    addRole: function(role) { this._roles.push(role); },
    deleteRole: function(role) { 
        var i = this._roles.indexOf(role);
        while(i != -1) {
            this._roles.splice(i,1);
            i = this._roles.indexOf(role);
        }
    },
    roles: function() { return this._roles; },
    addMachine: function(machine) { this._machines.push(machine); },
    deleteMachine: function(machine) { 
        var i = this._machines.indexOf(machine);
        while(i != -1) {
            this._machines.splice(i,1);
            i = this._machines.indexOf(machine);
        }
    },
    machines: function() { return this._machines; },
    addProcess: function(process) { this._processes.push(process); },
    deleteProcess: function(process) { 
        var i = this._processes.indexOf(process);
        while(i != -1) {
            this._processes.splice(i,1);
            i = this._processes.indexOf(process);
        }
    },
    processes: function() { return this._processes; },
    runProcessOnItem: function(process, item) {
        var i = this._processes.indexOf(process);
        if(i == -1) {
            throw Error("process '" + process + "' is not available at this shop");
        }
    }
};