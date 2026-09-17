/* Las fugas revisadas a mano y aceptadas.

   El detector es tosco a propósito: prefiere señalar de más. Cuando la señal se
   revisa y resulta ser un falso positivo, se anota AQUÍ con su motivo, y no se
   apaga el detector. Así la lista de excepciones es corta, se lee, y cualquier
   fuga nueva sigue tumbando la generación.

   La clave es el enunciado más la respuesta correcta: si el ejercicio cambia,
   la excepción deja de aplicar y el detector vuelve a hablar. Eso es a
   propósito. */
module.exports = [
  {
    p: "Metiste 3 goles y después 2. Sumarlos te dice:",
    r: "Cuántos goles metiste",
    motivo:
      "«metiste» está también en un distractor («En qué minuto los metiste»); " +
      "lo que el detector ve como eco es la conjugación, no una pista.",
  },
  {
    p: "Caja chiquita de plastilina o caja grande de algodón. ¿Cuál pesa más?",
    r: "La chiquita de plastilina",
    motivo:
      "El enunciado enumera las dos cajas y cada opción nombra una: es el " +
      "ejercicio. Nombrar la de plastilina no dice si pesa más.",
  },
  {
    p: "Bola de icopor grande o bola de metal pequeña. ¿Cuál pesa más?",
    r: "La bola de metal",
    motivo: "Mismo caso: las dos bolas están en el enunciado y cada una es una opción.",
  },
  {
    p: "Lápiz a la derecha, borrador a la izquierda. Coges el lápiz con:",
    r: "La mano derecha",
    motivo:
      "Los DOS lados se nombran en el enunciado a propósito. Emparejar " +
      "«derecha» no decide nada porque «izquierda» también está ahí.",
  },
  {
    p: "Lápiz a la derecha, borrador a la izquierda. Coges el borrador con:",
    r: "La mano izquierda",
    motivo: "Igual que la anterior, con el objeto cambiado.",
  },
  {
    p: "Al pasar agua al vaso, el agua que sale de la jarra es:",
    r: "La misma que entra al vaso",
    motivo:
      "«vaso» está en las cuatro opciones o implícito en todas; el eco que " +
      "ve el detector es la palabra que sostiene la frase, no una pista.",
  },
];
