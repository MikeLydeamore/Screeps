var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
      
        var util = require('util');
        
	    if (creep.memory.upgrading && creep.carry.energy == 0) {
	        creep.memory.upgrading = false;
	        creep.say('Harvesting');
        }
        
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('Upgrading');
        }
        
        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var sources = util.getRemoteContainers(creep.room);
            sources = _.filter(sources, (s) => creep.pos.getRangeTo(s) < 4);
            
            if(creep.withdraw(creep.pos.findClosestByPath(sources), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.pos.findClosestByPath(sources));
            }
        }
	}
};

module.exports = roleUpgrader;