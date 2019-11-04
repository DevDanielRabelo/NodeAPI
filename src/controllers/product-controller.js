'use strict'

const repository = require('../repositories/product-repository');
const azure = require('azure-storage');
const guid = require('guid');
const config = require('../config');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            massage: 'Falha ao processar sua requisição'
        });
    }
};

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            massage: 'Falha ao processar sua requisição'
        });
    }
};

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            massage: 'Falha ao processar sua requisição'
        });
    }
};

exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            massage: 'Falha ao processar sua requisição'
        });
    }
};

exports.post = async (req, res, next) => {
    try {

        //Criando o blob Service
        // const blobSvc = azure.createBlobService(config.containerConnectionString);

        let filename = guid.raw() + '.jpg';
        // let rawdata = req.body.image;
        // let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        // let type = matches[1];
        // let buffer = new Buffer(matches[2], 'base64');

        //Salvar Imagem
        await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
            contentType: type
        }, function (error, result, response) {
            if (error) {
                filename = 'default-product.png'
            }
        });

        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: 'https://testedaniel.blob.core.windows.net/product-images/' + filename
        });
        res.status(201).send({ massage: 'Produto cadastrado com sucesso!' });
    } catch (e) {
        res.status(500).send({
            massage: 'Falha ao processar sua requisição',
            data: e
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            massage: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            massage: 'Falha ao processar sua requisição'
        });
    }
};

exports.delet = async (req, res, next) => {
    try {
        await repository.delet(req.body.id);
        res.status(200).send({
            massage: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            massage: 'Falha ao processar sua requisição'
        });
    }
};