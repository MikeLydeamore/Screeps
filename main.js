var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var autoSpawner = require('spawn.autospawn');
var util = require('util');
var roleRepairer = require('role.repairer');
var roleTrucker = require('role.trucker');

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
     }
    
    var spawning = false;
    for (var room_ in Game.rooms) {
            spawning = autoSpawner.spawnHarvesters(Game.rooms[room_]);
        if (!spawning) {
            spawning = autoSpawner.spawnIfLess(Game.rooms[room_],"trucker", 4);
        }
        if (!spawning) {
            var maxBuilders = 5;
            spawning = autoSpawner.spawnIfLess(Game.rooms[room_],"builder", Game.spawns["Spawn1"].room.find(FIND_CONSTRUCTION_SITES).length*2 < maxBuilders ? 
            Game.spawns["Spawn1"].room.find(FIND_CONSTRUCTION_SITES).length*2 : maxBuilders);
        }
        if (!spawning) {
            spawning = autoSpawner.spawnIfLess(Game.rooms[room_],"upgrader", 5);
        }
        if (!spawning) {
            spawning = autoSpawner.spawnIfLess(Game.rooms[room_],"repairer", 2);
        }
    }


    
    
    
    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        var needsMove = false;
        if (creep.memory.hasOwnProperty("workroom")) {
            var flag = Game.flags[creep.memory.workroom];
            if (flag.pos.roomName != creep.pos.roomName) {
                creep.moveTo(flag);
                needsMove = true;
            }
        }
        if (!needsMove) {
        
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if (creep.memory.role == 'repairer') {
                roleRepairer.run(creep);
            }
            if (creep.memory.role == 'trucker') {
                roleTrucker.run(creep);
            }
        }
    }
}