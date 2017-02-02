var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
            
        var util = require('util');
        
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('Harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('Building');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length == 0) {
                //Nothing to build... might as well do some shipping.
                creep.memory.role = 'trucker';
            }
            if(targets.length) {
                targets.sort(function (a, b) {
                    return (a.progress - b.progress);
                });
                if(creep.build(targets[targets.length-1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[targets.length-1]);
                }
            }
        }
        else {
            var sources = util.getRemoteContainers(creep.room);
            if (sources.length == 0) {
                sources = util.getAllContainersWithEnergy(creep.room);
            }
            
            if(creep.withdraw(creep.pos.findClosestByRange(sources), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.pos.findClosestByRange(sources));
            }
        }
    }
};

module.exports = roleBuilder;