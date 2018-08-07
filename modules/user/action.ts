/// <reference path="../../typings/index.d.ts" />

import {userModel} from './models';
import {userAttributes, userInstance} from './models/user';
import * as Promise from 'bluebird';
import * as Sequelize from 'sequelize';
let User = userModel;

// nickname, email, password, permission is required.

export function addUser(nickname: string, email: string, password: string, permission: number, language: string, optional_info: any): Promise<userInstance>{

    /* Required fields. */
    permission = permission || 1;
    language = language || 'zh-tw';

    return User.create({
        nickname: nickname,
        email: email,
        password: '',
        password_salt: '',
        permission: permission,
        language: language,
        locked: false,
        firstname: optional_info.firstname,
        lastname: optional_info.lastname,
        head_image_url: optional_info.head_image_url,
        core_concept: optional_info.core_concept,
        job_title: optional_info.job_title,
        birthday: optional_info.birthday,
        profession: optional_info.profession,
        interest: optional_info.interest,
        gender: optional_info.gender,
        facebook_id: optional_info.facebook_id,
        twitter_id: optional_info.twitter_id,
        skype_id: optional_info.skype_id,
        follower_count: 0,
        following_count: 0
    })
    .then((user: userInstance) => {
        return user.setPassword(password);
    })
    .catch(function(err){
        console.log("Add user failed - " + err);
        throw(err);
    });
}

export function editUser (user_id: number, updateFields: any): Promise<userInstance>{
    return User.findById(user_id)
    .then((user: userInstance) => {
       if(updateFields.nickname) user.nickname = updateFields.nickname;
       if(updateFields.password) user.setPassword(updateFields.password);
       if(updateFields.language) user.language = updateFields.language;
       if(updateFields.locked) user.locked = updateFields.locked;
       if(updateFields.firstname) user.firstname = updateFields.firstname;
       if(updateFields.lastname) user.lastname = updateFields.lastname;
       if(updateFields.head_image_url) user.head_image_url = updateFields.head_image_url;
       if(updateFields.core_concept) user.core_concept = updateFields.core_concept;
       if(updateFields.job_title) user.job_title = updateFields.job_title;
       if(updateFields.birthday) user.birthday = updateFields.birthday;
       if(updateFields.interest) user.interest = updateFields.interest;
       if(updateFields.gender) user.gender = updateFields.gender;
       if(updateFields.facebook_id) user.facebook_id = updateFields.facebook_id;
       if(updateFields.twitter_id) user.twitter_id = updateFields.twitter_id;
       if(updateFields.skype_id) user.skype_id = updateFields.skype_id;

       return user.save();
    })
    .catch((err: Sequelize.Errors) => {
        console.error('Edit user failed - ' + err);
    });
}

export function getUserById (user_id: number, getAllData?: boolean): Promise<any>{
    if (getAllData) return User.findById(user_id);
    else {
        return User.findById(user_id,
        {
            attributes: ['nickname', 'email', 'permission', 'language', 'locked', 'user_id',
            'firstname', 'lastname', 'head_image_url', 'core_concept', 'job_title', 'birthday', 'profession',
            'interest', 'gender', 'facebook_id', 'twitter_id', 'skype_id', 'follower_count', 'following_count']
        })
    }
}

export function getUserByEmail (email: string, getAllData?: boolean): Promise<any>{
    if(getAllData)
        return User.findOne({ where:{ email: email } });
    else {
        return User.findOne({
            where:{ email: email },
            attributes: ['nickname', 'email', 'permission', 'language', 'locked', 'user_id',
            'firstname', 'lastname', 'head_image_url', 'core_concept', 'job_title', 'birthday', 'profession',
            'interest', 'gender', 'facebook_id', 'twitter_id', 'skype_id', 'follower_count', 'following_count']
        });
    }
}

export function deleteSensitiveInformation (user: userInstance): userInstance{
    if(user.password) delete user.password;
    if(user.password_salt) delete user.password_salt;
    if(user.createdAt) delete user.createdAt;
    if(user.updatedAt) delete user.updatedAt;

    if(user.dataValues.password) delete user.dataValues.password;
    if(user.dataValues.password_salt) delete user.dataValues.password_salt;
    if(user.dataValues.createdAt) delete user.dataValues.createdAt;
    if(user.dataValues.updatedAt) delete user.dataValues.updatedAt;

    return user;
}
