const _private = new WeakMap();

class Alert
{

    constructor(_theme, _specification ) 
    {
        var properties = {
            _id:0,
            _theme,
            _specification,
            _urgent: false,
            _expiration : null,
            _read: false,
            _isGrupal:true,
        }
       _private.set(this, {properties})
    }

    get id() {
        return _private.get(this).properties['_id'];
    } 
    set id(newId) {
        return _private.get(this).properties['_id'] = newId;
    }
    newId(a)
    {
        this.id = a
    }
     
    getId(){ return this.id; }

    get theme() {
        return _private.get(this).properties['_theme'];
    } 
    set theme(newTheme) {
        return _private.get(this).properties['_theme'] = newTheme;
    }
    newTheme(a)
    {
        this.theme = a
    }
    getTheme(){ return this.theme; }

    get specification() {
        return _private.get(this).properties['_specification'];
    }
    set specification(newSpec) {
        return _private.get(this).properties['_specification'] = newSpec;
    } 
    newSpecification(a)
    {
        this.specification = a
    }
    
    get urgent() {
        return _private.get(this).properties['_urgent'];
    } 
    set urgent(u) {
        return _private.get(this).properties['_urgent'] = u;
    }
    isUrgent()
    {
        this.urgent = true
    }
    showIfUrgent()
    {
        return this.urgent? true : false
    }

    get expiration() {
        return _private.get(this).properties['_expiration'];
    } 
    set expiration(fecha) { //"2018/01/30 23:30:14"
        return _private.get(this).properties['_expiration'] = fecha;}
    setExpiration(fechaHora){
        let f = new Date(fechaHora);
        this.expiration = f;
    }
    getExpiration(){
        return this.expiration === null? false : true
    }
    expired(){
        if (this.getExpiration() === true)
       { 
        var ahora = new Date();
        return this.expiration < ahora ? true : false;
       }
       return true;

    }
    

    get read() {
        return _private.get(this).properties['_read'];
    }
    set read(visto) {
        return _private.get(this).properties['_read'] = visto;
    }
    viewed(){
        this.read=true
    } 
    showViewed()
    {
        return this.read
    }

    get isGrupal() {
        return _private.get(this).properties['_isGrupal'];
    }
    set isGrupal(is) {
        return _private.get(this).properties['_isGrupal'] = is;
    }
    notGrupal(){
        this.isGrupal=false
    }
    getIfIsGrupal(){    return this.isGrupal; }

    getAllData() {
        this.urgent?
        console.log( `Tema: ${this.theme}, Especificación: ${this.specification} , Leído: ${this.read} , Alerta: Grupal , Tipo: Urgente, Messege Nro: ${this.getId ()}`)
        :this.isGrupal? console.log( `Tema: ${this.theme}, Especificación: ${this.specification} , Leído: ${this.read} , Alerta: Grupal, Messege Nro: ${this.getId ()}`)
        :console.log( `Tema: ${this.theme}, Especificación: ${this.specification} , Leído: ${this.read}`)
    }
}

 module.exports = { Alert}
 

 
