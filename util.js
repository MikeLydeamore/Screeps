/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('util');
 * mod.thing == 'a thing'; // true
 */
 
var util = {
    getRandomInt: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    
    capitalizeFirstLetter: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    
    checkCreepHasSourceId: function(creep) {
       var util = require('util');
        if (!creep.memory.hasOwnProperty("sourceid")) {
            var id = util.getRandomInt(0, creep.room.find(FIND_SOURCES).length);
            console.log("Assigning the creep to Node "+id);
            creep.memory.sourceid = creep.room.find(FIND_SOURCES)[id].id;
        } 
    },
    
    getRemoteContainers: function(room_) {
        var sources = room_.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                            structure.structureType == STRUCTURE_CONTAINER
                                && structure.pos.findInRange(FIND_SOURCES, 3).length == 0
                                && _.sum(structure.store) != 0
                        )
                }
            });
        return sources;
    },
    
    getAllContainersWithEnergy: function(room_) {
        var sources = room_.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                            structure.structureType == STRUCTURE_CONTAINER
                                && _.sum(structure.store) != 0
                        )
                }
            });
        return sources;
    }
    
    
    
};


module.exports = util;