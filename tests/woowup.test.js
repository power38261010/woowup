const {Alert} = require('../src/alert');
const {Individual} = require('../src/individual'); 
const {User} = require('../src/user'); 
const {AppAlerts} = require('../src/appalert');

describe("AppAlert", () => {
  const alert = new AppAlerts();
  
  test("1) Se registran usuarios", () => {
    alert.addUser("Carlos")
    alert.addUser("Mariano")
    expect(alert.functionForJestCountUsers()).toEqual(2);
  });

  test("2) Se registran temas que luego se enviarán", () => {
    alert.addAlertInformative("Deporte","Empieza el Mundial","2018/01/14 23:30:14")
    alert.addAlertInformative("Turismo","Carnaval de Brasil","2018/01/14 23:30:14")
    expect(alert.functionForJestCountAlerts()).toEqual(2);
  });

  test("3) Los usuarios pueden optar sobre que temas desean recibir alertas", () => {
    alert.addThemesForUser("Carlos",["Turismo","Politica"])
    expect(alert.countThemesForUser("Carlos")).toEqual(2);
  });

  test("4) Se puede enviar una alerta sobre un tema y lo reciben todos los usuarios que han optado recibir alertas de este tema", () => {
    alert.addUser("Leonel",["Deporte","Politica"])//Linea 16 deporte / linea 22 Carlos recibirá Turismo de linea 17
    alert.sendAlertsForUser()
    expect(alert.countAlertsForUser("Leonel")).toEqual(1);
    expect(alert.countAlertsForUser("Carlos")).toEqual(1);
  });

  test("5) Se puede enviar una alerta sobre un tema a un usuario específico y lo recibe solamente él", () => {
    alert.addUser("Emanuel")
    alert.addUser("Pablo")
    alert.addAlertIndividual("HomeBanking","30% de Descuento en todos los %DIA","Emanuel")
    alert.sendAlertsForUser()
    expect( alert.countAlertsForUser("Emanuel") ).toEqual(1);
    expect(alert.countAlertsForUser("Pablo")).toEqual(0);
  });

  test("6) Una alerta puede tener una fecha y hora de expiracion, no se muestran al usuario si expiraron", () => {
    alert.addUser("Exequiel",["Pesca","Dev"])
    alert.addAlertInformative("Pesca","Pique en Arroyo San Carlos","2018/01/30 23:30:14") 
    alert.addAlertInformative("Dev","Nerdearla Weakend","2022/11/30 23:30:14")
    alert.sendAlertsForUser()
    expect( alert.countAlertsForUser("Exequiel") ).toEqual(2);
    alert.clearAlertExpired()
    alert.sendAlertsForUser()
    expect(alert.countAlertsForUser("Exequiel")).toEqual(1);
  });

  test("7) Hay dos tipos de Alertas : Informativo (llega a c/usuario que optó cierto tema) y Urgente (les llega la alerta a todos)", () => {
    alert.addUser("Juan",["Viaje","IT"])
    alert.addUser("Diego")
    alert.addAlertInformative("Viaje","Cancelación de Viajes por Pandemia") 
    alert.addAlertUrgent("Oferta","Empieza el CyberMonday","2022/11/09 23:59:59")
    alert.sendAlertsForUser()
    expect( alert.countAlertsForUser("Juan") ).toEqual(2);
    expect(alert.countAlertsForUser("Diego")).toEqual(1);
    alert.sendCleansedAlertsForeachUser()// limpio alerta linea 58, ya que es masivo y afecta al resto de los arreglos de alerta por usuario, sale por expiracion
  });

  test("8) Un usuario puede marcar una alerta como leída", () => {
    alert.addUser("Beto",["Carreras","Casino"])
    alert.addAlertInformative("Carreras","Campeonato TC") 
    alert.sendAlertsForUser()
    alert.sightAlertForUser("Beto",7)
    expect( alert.showIfSightAlertForUser("Beto",7)).toBeTruthy()
  });

  test("9) Se puede obtener todas las alertas no expiradas de un usuario que aun no ha leído, ordenado por la mas reciente", () => {
 
    alert.addUser("Messi",["Playstation","Bitcoins"])
    alert.addAlertInformative("Playstation","FIFA 2023","2022/12/21 23:30:14")
    alert.addAlertInformative("Bitcoins","Caída del Bitcoin","2022/11/09 23:59:59")
    alert.addAlertUrgent("Conflícto Ucrania Rusia","Polonia y Estonia estan al borde de combatir")
    alert.addAlertIndividual("Transfermarket","Observa tu valoración anual","Messi","2022/12/01 23:30:14")
    alert.sendAlertsForUser()
    alert.sightAlertForUser("Messi",10)
    expect( alert.showIfSightAlertForUser("Messi",10)).toBeTruthy()
    expect(alert.countAlertsForUser("Messi")).toEqual(4);
    alert.sendCleansedAlertsForeachUser()
    expect(alert.countAlertsForUser("Messi")).toEqual(2);
  
  });

  test("10) Se pueden obtener todas las alertas no expiradas para un tema (desde la mas reciente), se muestra para cada alerta si es grupal", () => {
    alert.addAlertInformative("Coto","Descuento todos los Martes")
    alert.addAlertInformative("Wallmart","Descuento todos los Viernes")
    alert.addAlertInformative("Wallmart","Participa del sorteo de un viaje a Qatar para acompañar la selección") 
    alert.addAlertInformative("Wallmart","Black Friday","2022/11/30 23:30:14")
    alert.addAlertIndividual("Wallmart","Recibí tu tarjeta Maestro Wallmart","Leonel")// Leonel creado en linea 27
    alert.sortForTheme("Wallmart")
    expect(alert.countAlertsForTheme()).toEqual(4);
    expect(alert.countAlertsGrupalForTheme()).toEqual(3);
    expect(alert.countAlertsIndividualForTheme()).toEqual(1);
  });
  
});