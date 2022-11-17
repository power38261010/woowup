const _private = new WeakMap();

class User
{
    constructor(_name, themes = [])
    {
        this.arrayAlerts = []
        this.themes = themes;
        const properties = { _name  }
        _private.set(this, {properties});
    }

    get name()
    {
        return _private.get(this).properties['_name'];
    } 
    set name(newName)
    {
        return _private.get(this).properties['_name'] = newName;
    }
    changeName(n){  this.name = n}
    getName(){return this.name}

    newThemes(n)
    {
     if ( n instanceof Array )
     {
        if (this.themes.length < 1) {   this.themes = [...n]}
        else {this.themes = [...themes,...n]} 
     }

     else
    {
        if (this.themes.length < 1) {   this.themes = n }
        else {this.themes= [...themes , n] } 
    }
    }
    getThemes(){    return this.themes}
    clearThemes(){ this.themes=[]}
    countThemes() { return this.themes.length }

    setAlerts(a) {
        this.arrayAlerts= [ ...this.arrayAlerts, a ];
    }
    clearAlerts() { 
        this.arrayAlerts= [];
    }
    setArrayAlerts(a) { 
        this.clearAlerts();
        this.arrayAlerts = [...a]
    }
    getArrayAlerts() 
    {
        console.log("CountAlerts:" + this.arrayAlerts.length)
        for(let i = 0; i < this.arrayAlerts.length; i++)
        {
             this.arrayAlerts[i].getAllData()
        }
    }
    countAlerts()
    {
        return this.arrayAlerts.length
    }


    sightAlert(nro_id)
    {
        for(let i = 0; i <   this.arrayAlerts.length; i++)
        {
            if (  this.arrayAlerts[i].getId() === nro_id)
            {
                this.arrayAlerts[i].viewed();
            }
        }
    }

    showIfSightAlert(nro_id)
    {
        for(let i = 0; i <   this.arrayAlerts.length; i++)
        {
            if (  this.arrayAlerts[i].getId() === nro_id)
            {
               return this.arrayAlerts[i].showViewed()
            }
        }
    }

}
module.exports = { User}



