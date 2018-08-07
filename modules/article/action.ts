/// <reference path="../../typings/index.d.ts" />
import {articleModel, articleInstance, articleAttributes} from './models';
import * as BluebirdPromise from 'bluebird';
import * as Sequelize from 'sequelize';
import {fileAPI} from './';
import {app} from "../../app";
let sequelize: Sequelize.Connection = app.db.sql;

/* Functions from JasonXDDD */
function createContent(data: string){
    data = data.replace(" ","&nbsp;").replace(/\n/g,"<br />");
    return `<div class="row content"><div class="col-12 font-thin">${data}</div></div><!--content-row-->`;
}
function createImage(imageURL: string, imageDescription: string){
	return `<div><img class="XDD-img" src="${imageURL}" width="80%">
            <div style="margin: 0 auto; width: 80%;">${imageDescription}</div></div>`;
}
function createTitle(data: string){
    return `<div class="row title"><div class="col-12 font-thin">${data}</div></div><!--title-row-->`;
}
function createHr(){
	return `<div class="row line"><div class="hr">&nbsp;</div></div>`
}
function changeBackground(imageURL: string){
    return `<script>var bg = document.getElementById('bg');
	bg.style.backgroundImage = url(${imageURL});</script>`;
}
function createComp(){
    return `<div class="XDD-comp"></div>`;
}

export function renderTitleHTML(title: string): string{
    return createHr() + createTitle(title) + createComp();
}

export function renderBackgroundHTML(background_url: string): string{
    return changeBackground(background_url);
}

export async function combineContentHTML(content: any): Promise<string>{
    return new BluebirdPromise<string>(async(resolve) => {
        let fullHTML = '';

        for (let i = 0; i < content.length; i++) {
            if (content[i].type === "content"){
                fullHTML += createContent(content[i].content);
                fullHTML += createComp();
            }
            else if (content[i].type === "image" &&
                ((content[i].image_data !== undefined && content[i].image_filename !== undefined) ||
                content[i].image_url !== undefined)){
                if(content[i].image_description === undefined)
                    content[i].image_description = '';
                if (content[i].image_url === undefined) {
                    let imageSaveResult = await
                    fileAPI.saveFile(content[i].image_filename,
                        new Buffer(content[i].image_data, "base64"));
                    fullHTML += createImage(imageSaveResult.URI, content[i].image_description);
                    content[i].image_data = ""; // Clear the content of image, or it will be a huge amount of data.
                    content[i].image_url  = imageSaveResult.URI;
                }
                else fullHTML += createImage(content[i].image_url, content[i].image_description);
                fullHTML += createComp();
            }
        }
        return resolve(fullHTML);
    })
}

export function rebuildAllArticleHTML(){
    let promiseList = [];
    return articleModel.findAll()
    .then(async(articleList: articleInstance[]) => {
        for (var i in articleList){
            // Content is stored in database as JSON string, so it should be parsed first.
            articleList[i].rendered_HTML = await combineContentHTML(JSON.parse(articleList[i].content));
            promiseList.push(articleList[i].save());
        }
        return BluebirdPromise.all(promiseList);
    })
}

export function addArticle(creatorID: number, data: articleAttributes, t?: Sequelize.Transaction): BluebirdPromise<articleInstance>{
    let article: articleInstance;
    let fullHTML = "";
    if(t != null){
        data.required_permission = data.required_permission || 0;
        data.visable = data.visable || true;
        return articleModel.create({
            title: data.title,
            author: data.author,
            required_permission: data.required_permission,
            visable: data.visable
        }, {transaction: t})
        .then(async(_article) => {
            article = _article;

            if (data.background_filename !== undefined && data.background_data !== undefined){
                let saveFileResult = await fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
                article.background_url = saveFileResult.URI;
            }

            article.rendered_HTML = await combineContentHTML(data.content);
            article.content = JSON.stringify(data.content);

            return article.save({transaction: t});
        });
    }
    else{
        return sequelize.transaction((t) => {
            data.required_permission = data.required_permission || 0;
            data.visable = data.visable || true;
            return articleModel.create({
                title: data.title,
                author: data.author,
                required_permission: data.required_permission,
                visable: data.visable
            }, {transaction: t})
            .then(async(_article) => {
                article = _article;

                if (data.background_filename !== undefined && data.background_data !== undefined){
                    let saveFileResult = await fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
                    article.background_url = saveFileResult.URI;
                }

                article.rendered_HTML = await combineContentHTML(data.content);
                article.content = JSON.stringify(data.content);

                return article.save({transaction: t});
            });
        })
    }
}

export function getArticleList(): BluebirdPromise<articleInstance[]>{
    return articleModel.findAll({
        attributes: ['title', 'author', 'background_url', 'article_id']
    });
}

export function getArticle(id: number): BluebirdPromise<articleInstance>{
    return articleModel.findById(id);
}

export function updateArticle(articleID: number, data: articleAttributes, t?: Sequelize.Transaction): BluebirdPromise<articleInstance>{
    if(t != null) {
        let article: articleInstance;
        return articleModel.findById(articleID)
        .then(async(article) => {
            if(article == null) throw new Error("Article not found!");
            if(data.title != null) article.title = data.title;
            if(data.author != null) article.author = data.author;
            if(data.required_permission != null) article.required_permission = data.required_permission;
            if(data.visable != null) article.required_permission = data.required_permission;

            if(data.background_data != null && data.background_filename != null){
                let result = await fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
                article.background_url = result.URI;
            }

            if(data.content != null) {
                article.rendered_HTML = await combineContentHTML(data.content);
                article.content = JSON.stringify(data.content);
            }

            return article.save({transaction: t});
        })
    }
    else {
        let article: articleInstance;
        return sequelize.transaction((t) => {
            return articleModel.findById(articleID)
            .then(async(article) => {
                if(article == null) throw new Error("Article not found!");
                if(data.title != null) article.title = data.title;
                if(data.author != null) article.author = data.author;
                if(data.required_permission != null) article.required_permission = data.required_permission;
                if(data.visable != null) article.required_permission = data.required_permission;

                if(data.background_data != null && data.background_filename != null){
                    let result = await fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
                    article.background_url = result.URI;
                }

                if(data.content != null) {
                    article.rendered_HTML = await combineContentHTML(data.content);
                    article.content = JSON.stringify(data.content);
                }
                return article.save({transaction: t});
            })
        })
    }

}

export function bulkUpdateArticle(articleList: articleAttributes[]): BluebirdPromise<any>{
    return sequelize.transaction((t) => {
        let promiseList = [];
        articleList.forEach((article) => {
            promiseList.push(updateArticle(article.article_id, {
                title: article.title,
                author: article.author,
                content: article.content,
                required_permission: article.required_permission,
                visable: article.visable,
                background_data: article.background_data,
                background_filename: article.background_filename }, t));
        });
        return BluebirdPromise.all(promiseList);
    })
}

export function deleteArticle(articleID: number, t?: Sequelize.Transaction): BluebirdPromise<void>{
    if(t != null){
        return articleModel.findById(articleID)
        .then((article) => {
            if (article != null)
                return article.destroy({transaction: t});
            else
                throw new Error("Article not exist.");
        })
    }
    else {
        return sequelize.transaction((t) => {
            return articleModel.findById(articleID)
            .then((article) => {
                if (article != null)
                    return article.destroy({transaction: t});
                else
                    throw new Error("Article not exist.");
            })
        })
    }

}
