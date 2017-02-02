var roleTrucker = {
    
    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.withdrawing && creep.carry.energy < creep.carryCapacity) {
            var sources = _.filter(creep.room.find(FIND_STRUCTURES), (s) => s.structureType == STRUCTURE_CONTAINER 
            && s.pos.findInRange(FIND_SOURCES, 3) != 0
            && _.sum(s.store) > 0);
            //console.log(creep.harvest(sources[0], RESOURCE_ENERGY));
            if(creep.withdraw(creep.pos.findClosestByRange(sources), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.pos.findClosestByRange(sources));
            }
        }
        else {
            //Empty the energy
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                            ( (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION)
                            && (structure.energy < structure.energyCapacity) )
                            ||
                            ( (structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) < structure.storeCapacity)
                                && structure.pos.findInRange(FIND_SOURCES, 3).length == 0 )
                        )
                }
            });
        targets.sort(function(a,b) {
            if (a.structureType == STRUCTURE_SPAWN) {
                return -1;
            } else {
                if (a.structureType == STRUCTURE_CONTAINER) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });

        if (targets[0].structureType == STRUCTURE_SPAWN || targets[0].structureType == STRUCTURE_EXTENSION) { //Spawn only
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            var targets = _.filter(targets, (s) => s.structureType == STRUCTURE_CONTAINER);
            if (creep.transfer(creep.pos.findClosestByPath(targets), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.pos.findClosestByPath(targets));
            }
        }
        
        if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.withdrawing = false;
        }
        if (creep.carry.energy == 0) {
            creep.memory.withdrawing = true;
        }
	    }
    }
};

module.exports = roleTrucker;