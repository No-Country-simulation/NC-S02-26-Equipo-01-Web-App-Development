Feature: Selección de servicio
  Como usuario quiero seleccionar un servicio
  Para iniciar el proceso de compra

Background:
  Given que el usuario navega a la landing principal con "?gclid=g_123&fbclid=f_456"
    And los datos de tráfico se almacenan correctamente en el sistema

  @UI @HU2
  Scenario: Elegir un servicio para ingresar al proceso de pago
    When el usuario navega hasta la sección de planes
    Then se deben visualizar los precios de los servicios
    And el usuario hace click en el botón "Start Now" del plan "$499"
    Then el usuario es redirigido a la página de pago

    @UI @Negative @HU2
  Scenario: Error de inconsistencia de precios en la selección
    When el usuario visualiza un plan sin precio definido
    And el usuario hace click en el botón "Start Now" del plan ""
    Then el sistema debe bloquear la redirección al checkout
    And debe mostrar un aviso de "Precio no disponible, contacte a soporte"
