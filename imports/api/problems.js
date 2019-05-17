import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Problems = new Mongo.Collection('problems');

Meteor.methods({
    'problems.insert'(text, id, name){
        check(text, String);
        check(name, String);
        check(id, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized')
        }
        Problems.insert({
            text,
            createdAt: new Date(),
            owner: id,
            username: name,
        });
    },
    'problems.remove'(problemId) {
        check(problemId, String);
        const problems = Problems.findOne(problemId);
        if (problems.owner !== this.userId) {
            throw new Meteor.Error('not-authorized')
        }
        Problems.remove(problemId);
    },
});