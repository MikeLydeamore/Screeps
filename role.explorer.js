var roleExplorer = {
    run: function(creep) {
      
	   if(creep.memory.exploring && creep.carry.energy == 0) {
            creep.memory.exploring = false;
            creep.say('Harvesting');
        }
        if(!creep.memory.exploring && creep.carry.energy == creep.carryCapacity) {
            creep.memory.exploring = true;
                   
            creep.say('Exploring');
        }

        if(creep.memory.exploring) {
            creep.moveTo(creep.room.find)
           
        }
        else {
            var sources = _.filter(creep.room.find(FIND_STRUCTURES), (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0.15*s.storeCapacity);
            if(creep.withdraw(creep.pos.findClosestByRange(sources), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.pos.findClosestByRange(sources));
            }
        }
	}
};

module.exports = roleExplorer;