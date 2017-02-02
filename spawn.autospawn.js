var autoSpawn = {
    
    spawnIfLess: function(room_, type_, amount) {
        var util = require('util');
        
        var types = _.filter(Game.creeps, (creep) => creep.memory.role == type_);
        if (type_ == 'trucker') {
            var bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
        }
        else {
            var bodyParts = [WORK, WORK, WORK];
            var spawn = room_.find(FIND_MY_SPAWNS)[0];
            var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
                });
            if (spawn == undefined) {
                return false;   
            }
            var workNumbers = (spawn.energyCapacity - 300)/100 + Math.floor(0.5*extensions.length);
            for (var i = 0 ; i < workNumbers ; i++) {
                bodyParts.push(CARRY); bodyParts.push(MOVE);
            }
        }
        
        if (Game.spawns["Spawn1"].canCreateCreep(bodyParts, undefined, {role: type_}) == 0 && types.length < amount) {
            var newName = util.capitalizeFirstLetter(type_)+"_"+(Math.floor(Math.random() * 65534) + 1);
            Game.spawns["Spawn1"].createCreep(bodyParts, newName, {role: type_});
            console.log('Spawning new '+ type_+ ': ' + newName);
            
            return true;
        }
    },
    
    spawnHarvesters: function(room_) {
        var creepHarvesters = _.filter(room_.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'harvester');
        var numHarvesters = 2;
        var sources = room_.find(FIND_SOURCES);
        if (creepHarvesters.length < sources.length*numHarvesters) {
            //Spawn a new harvester.
            for (var source in sources) {
                //For each source, try to find a creep.
                var found = _.fill(Array(numHarvesters), false);
                if (creepHarvesters.length) {
                    for (var creep in creepHarvesters) {
                        if (creepHarvesters[creep].memory.sourceid == sources[source].id) {
                            for (var i = 0 ; i < found.length ; i++) {
                                if (!found[i]) {
                                    found[i] = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (found.includes(false)) {
                    var spawn = room_.find(FIND_MY_SPAWNS)[0];
                    var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
                    filter: { structureType: STRUCTURE_EXTENSION }
                        });
                    if (spawn == undefined) {
                        return false;
                    }
                    var workNumbers = (spawn.energyCapacity - 100)/100 + Math.floor(0.5*extensions.length);
                    var bodyParts = [MOVE, CARRY];
                    for (var i = 0 ; i < workNumbers ; i++) {
                        bodyParts.push(WORK);
                    }
                    if (spawn.canCreateCreep(bodyParts) == 0) {
                        var newName = "Harvester_"+(Math.floor(Math.random() * 65534) + 1);
                        spawn.createCreep(bodyParts, newName, {role: 'harvester', sourceid: sources[source].id});
                        console.log('Spawning new harvester: ' + newName);
                        return true;
                    }
                }
            }
        }
    },
    
    getNodeForHarvester: function(room_) {
        var creepHarvesters = _.filter(room_.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'harvester');
        var numHarvesters = 2;
        var sources = room_.find(FIND_SOURCES);
        if (creepHarvesters.length < sources.length*numHarvesters) {
            //Spawn a new harvester.
            for (var source in sources) {
                //For each source, try to find a creep.
                var found = _.fill(Array(numHarvesters), false);
                if (creepHarvesters.length) {
                    for (var creep in creepHarvesters) {
                        if (creepHarvesters[creep].memory.sourceid == sources[source].id) {
                            for (var i = 0 ; i < found.length ; i++) {
                                if (!found[i]) {
                                    found[i] = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (found.includes(false)) {
                    return sources[source];
                }
            }
        }
    }
};


module.exports = autoSpawn;