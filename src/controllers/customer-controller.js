// 'use strict'

// const repository = require('../repositories/customer-repository');
// const md5 = require('md5');
// const emailService = require('../services/email-service');
// const authService = require('../services/auth-service');

// exports.post = async (req, res, next) => {
//     try {
//         await repository.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: md5(req.body.password + global.SALT_KEY),
//             roles: ["user"]
//         });

//         emailService.send(
//             req.body.email,
//             'Bem Vindo ao Teste Node.js',
//             global.EMAIL_TMPL.replace('{0}', req.body.name)
//         );

//         res.status(201).send({ massage: 'Cliente cadastrado com sucesso!' });
//     } catch (e) {
//         res.status(500).send({
//             massage: 'Falha ao processar sua requisição'
//         });
//     }
// };


// exports.authenticate = async (req, res, next) => {
//     try {
//         const customer = await repository.authenticate({
//             email: req.body.email,
//             password: md5(req.body.password + global.SALT_KEY)
//         });
//         if (!customer) {
//             res.status(404).send({ massage: 'Usuário ou senha inválidos' });
//             return;
//         }

//         const token = await authService.generateToken({
//             id: customer._id,
//             email: customer.email,
//             name: customer.name,
//             roles: customer.roles
//         })

//         res.status(201).send({
//             token: token,
//             data: {
//                 email: customer.email,
//                 name: customer.name
//             }
//         });
//     } catch (e) {
//         res.status(500).send({
//             massage: 'Falha ao processar sua requisição'
//         });
//     }
// };