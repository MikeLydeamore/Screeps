var roleRepairer = {
    run: function(creep) {
      
	   if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('Harvesting');
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: function(object) {
                    return object.hits < object.hitsMax && object.hitsMax - object.hits > REPAIR_POWER;
                }
            });
            
            if (targets.length) {
                creep.memory.repairid = targets[0].id;
            }
                   
            creep.say('Repairing');
        }

        if(creep.memory.repairing) {
            var structure = Game.getObjectById(creep.memory.repairid);
            if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.repairid));
            }
            
            if (structure.hits == structure.hitsMax) {
                creep.memory.repairing = false;
            }
           
        }
        else {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                            structure.structureType == STRUCTURE_CONTAINER
                                && structure.pos.findInRange(FIND_SOURCES, 3).length == 0
                        )
                }
            });
            if(creep.withdraw(creep.pos.findClosestByRange(sources), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.pos.findClosestByRange(sources));
            }
        }
	}
};

module.exports = roleRepairer;