// >= 200 && < 300 => Respostas de SUCESSO
const HTTP_200_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONT = 204;
// >= 400 && < 500 => Respostas de erro do Cliente 
const HTTP_BAD_RQT = 400;
const HTTP_UNAUTHD = 401;
const HTTP_FORBIDE = 403;
const HTTP_NOT_FND = 404;
const HTTP_CONFLIT = 409;
// A requisição está bem formada mas inabilitada para ser seguida devido a erros semânticos 
// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
// No caso, erro vindo da parte do usuário (user mess up)
const HTTP_UNP_ENT = 422;
// 500 INTERNAL SERVER ERROR
const HTTP_I_SV_ER = 500;

module.exports = {
  HTTP_200_OK,
  HTTP_CREATED,
  HTTP_NO_CONT,
  HTTP_BAD_RQT,
  HTTP_UNAUTHD,
  HTTP_FORBIDE,
  HTTP_NOT_FND,
  HTTP_CONFLIT,
  HTTP_UNP_ENT,
  HTTP_I_SV_ER,
};