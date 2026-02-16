Feature: Realizar compra del servicio
  Como usuario quiero completar el checkout 
  Para efectuar una compra del servicio

Background:
  Given que el usuario navega a la landing principal con "?gclid=g_123&fbclid=f_456"
    And los datos de tráfico se almacenan correctamente en el sistema
    And el usuario ha seleccionado un servicio de "$499"
    And se valida que el usuario se encuentra en la pasarela de pago

  @UI @HU3
  Scenario: Efectuar compra del servicio solicitado con todos los campos ingresados
    Then el precio total a pagar "$499" sea igual al servicio solicitado
    When el usuario rellena el formulario con los siguientes datos:
        | email             | card_number       | expiry | cvc | name          |
        | test@example.com  | 4242424242424242  | 12/26  | 123 | Juan Perez    |
    And hace click en el botón "Finalizar compra"
    Then el sistema debe procesar el pago y enviar los IDs "g_123" y "f_456" al servidor
    And el usuario es redirigido a la página de pago exitoso

    @UI @Negative @HU3
  Scenario: Validar error en el formulario por email inválido
    When el usuario rellena el formulario con un email con formato incorrecto "usuario@test"
    And hace click en el botón "Finalizar compra"
    Then el sistema debe mostrar un mensaje de alerta "Email inválido"
    And no debe permitir el progreso a la página de éxito

  @UI @Negative @HU3
  Scenario: Validar campos obligatorios vacíos
    When el usuario deja todos los campos del formulario en blanco
    And hace click en el botón "Finalizar compra"
    Then el sistema debe resaltar los campos obligatorios en rojo
    And no debe permitir el progreso a la página de éxito