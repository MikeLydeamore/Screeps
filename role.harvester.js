
var roleHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        var spawners = require('spawn.autospawn');
        
        if (!creep.memory.hasOwnProperty("sourceid")) {
            //Give it a source in it's current room.
           creep.memory.sourceid=spawners.getNodeForHarvester(creep.room);
        }
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            
            if(creep.harvest(Game.getObjectById(creep.memory.sourceid)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.sourceid));
            }
        }
        else {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: { structureType: STRUCTURE_CONTAINER }
            });
            if (creep.transfer(creep.pos.findClosestByRange(sources), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.pos.findClosestByRange(sources));
            }
        }
	}
};

module.exports = roleHarvester;