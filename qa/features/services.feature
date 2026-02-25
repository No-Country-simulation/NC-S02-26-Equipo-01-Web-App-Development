Feature: Interfaz de Usuario y Checkout
  Como usuario interesado en servicios legales
  Quiero navegar por la landing y completar el checkout
  Para adquirir un servicio de Incorporation o Tax

Background:
  Given que el usuario navega a la landing principal con "?gclid=g_123&fbclid=f_456"
    And los datos de tráfico se almacenan correctamente en el sistema

  @UI @HU1
  Scenario: Carga de landing para conocer los servicios ofrecidos
    When el usuario visualiza las opciones del menú
    And el usuario hace click en la opción "Services" del menú
    Then se deben visualizar los detalles de "Incorporation", "Tax" y "Bookkeeping"

  @UI @HU1 @Responsive
  Scenario: Visualización correcta en dispositivos móviles
    When el usuario accede desde un dispositivo "iPhone 13"
    And el usuario hace click en el menú hamburguesa
    And el usuario hace click en la opción "Services" del menú
    Then los servicios deben estar apilados verticalmente y ser legibles