const {Alert} = require('./alert');

class Individual extends Alert
{
    constructor(theme, specification, name) {
        super(theme, specification);
        super.notGrupal()
        this.name = name;        
        }
        viewed(){
            super.viewed();
        }
        showViewed(){   return super.showViewed()}

        setExpiration(fechaHora){
           return super.setExpiration(fechaHora)
        }
        getExpiration(){
            return super.getExpiration()
        }
        expired(){
           return super.expired();
        }

        getTheme(){ return super.getTheme();}

        getIfIsGrupal() {return super.getIfIsGrupal()}
   
        isName(_name){
            return this.name.toLowerCase()  === _name.toLowerCase() ? true : false;
        }
   
        newId(a)
        {
            super.newId(a)
        }
        getId () {  return super.getId () }
       
        getAllData() {
                  super.getAllData(); 
                  console.log(`Alerta: Individual, Para: ${this.name} , Messege Nro: ${this.getId ()}`)
    }
}
module.exports = { Individual}
 
 

