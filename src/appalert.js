const {Alert} = require('./alert');
const {Individual} = require('./individual');
const {User} = require('./user');


class AppAlerts
{
    constructor()
    {

        this.alerts = [];
        this.alertsForTheme = [];
        this.allAlerts = [];
        this.users = [];
        this.countID = 0;
    }

    existUser(name)
    {
        if (this.users.length === 0)    return false
        for(let i = 0; i < this.users.length; i++)
         {
                if (name.toLowerCase()  === this.users[i].getName().toLowerCase()) {return true}
         }
    }

    clearAlertExpired()
    {
    var aux = []
    for(let i = 0; i < this.alerts.length; i++)
    {
        if ( this.alerts[i].getExpiration() === false || this.alerts[i].expired() === false)
        {
            aux.push(this.alerts[i])
        }
    }
    this.alerts = [];
    this.alerts = [...aux]
    }
    clearAlertSight()
    {
    for(let i = 0; i < this.users.length; i++)
    {
        let newAlerts = this.users[i].arrayAlerts.filter(a=> a.showViewed() === false)
        this.users[i].setArrayAlerts(newAlerts)
    }
    }

    addUser(name, themes)
    {
        if( ! this.existUser(name))
        {
            let user = new User(name, themes)
            this.users = [...this.users, user];
        }
         else {  console.log("Nombre existente")     }
    }
    addThemesForUser(name , themes)
    {
        for(let i = 0; i < this.users.length; i++)
        {
               if (name.toLowerCase()  === this.users[i].getName().toLowerCase())
               {
               this.users[i].newThemes(themes)
               }
        }
    }
    

    addAlertIndividual (theme, specification,name,date=false)
    {
    if( this.existUser(name) )
    {
    let alert = new Individual(theme, specification, name)
    alert.newId(this.countID)
    this.countID = this.countID +1 ;
    if(date){ alert.setExpiration(date)}//"2022/11/30 23:30:14"
    this.allAlerts = [ ...this.allAlerts , alert]// incluyen las expiradas 
    this.alerts=[...this.alerts , alert]
    }
        else {  console.log("Nombre no existente")     }
    }
    addAlertInformative(theme, specification, date=false)
    {
        let alert = new Alert(theme, specification)
        alert.newId(this.countID)
        this.countID = this.countID +1 ;
        if(date){ alert.setExpiration(date)}//"2022/11/30 23:30:14"
        this.allAlerts = [ ...this.allAlerts , alert]// incluyen las expiradas 
        this.alerts=[...this.alerts , alert ]
    }
    addAlertUrgent(theme, specification, date=false)
     {
        let alert = new Alert(theme, specification)
        alert.newId(this.countID)
        this.countID = this.countID +1 ;
        alert.isUrgent();
        if(date){ alert.setExpiration(date)}//"2022/11/30 23:30:14"
        this.alerts=[...this.alerts , alert ]
        this.allAlerts = [ ...this.allAlerts , alert]// incluyen las expiradas 
    }

    sortAlertsByDateCreated()
    {
        this.alerts = this.alerts.sort((a, b) => {

            if(a.getId() > b.getId()) {
              return -1;
            }
            return 1;
          });
    }

    sendCleansedAlertsForeachUser()
    {
        this.clearAlertExpired();
        this.sortAlertsByDateCreated();
        this.sendAlertsForUser();
        this.clearAlertSight();
    }

    sendAlertsForUser()
    {
            for (let i = 0; i < this.users.length; i++)
        {
            this.users[i].clearAlerts();
            for (let j = 0; j < this.alerts.length; j++)
            {
                if (this.alerts[j] instanceof Individual)
                {
                    if (  this.alerts[j].isName(   this.users[i].getName()    )   )
                    {
                        this.users[i].setAlerts(this.alerts[j]);
                    }
                }

                if (    this.alerts[j].showIfUrgent()  )
                { this.users[i].setAlerts(this.alerts[j]);    }


                if (   this.users[i].getThemes().includes(     this.alerts[j].getTheme()    ) )
                { this.users[i].setAlerts(this.alerts[j]);}
            }
        }

    }

    showAllInfoAlerts()
    {
        for(let i = 0; i < this.alerts.length; i++)
        {
            this.allAlerts[i].getAllData()
        }
    }
    showInfoAlertsForEachUser()
    {
        for(let i = 0; i < this.users.length;i++)
        {
            console.log(`Usuario: ${this.users[i].getName()} , sus alertas:`)
            this.users[i].getArrayAlerts();
        }
    }

    sightAlertForUser(name,idAlert)
    {
        for(let i = 0; i < this.users.length; i++)
        {
            if(this.users[i].getName() === name)
            {

                this.users[i].sightAlert(idAlert)
            }
        }
    }
    showIfSightAlertForUser(name,idAlert)
    {
        for(let i = 0; i < this.users.length; i++)
        {
            if(this.users[i].getName() === name)
            {

              return this.users[i].showIfSightAlert(idAlert)
            }
        }

    }

    sortForTheme (theme)
    {
        this.clearAlertExpired();
        this.sortAlertsByDateCreated();
        this.alertsForTheme = [];
        for(let i = 0; i < this.alerts.length; i++) 
        {
            if(this.alerts[i].getTheme() === theme)
            {
                this.alertsForTheme.push(this.alerts[i])
            }
        }
    }
    /*       For Test    */
    functionForJestCountAlerts()
    {
        return  this.alerts.length
    }

    functionForJestCountUsers()
    {
        return this.users.length
    }

    countAlertsForUser(name)
    {
        for(let i = 0; i < this.users.length; i++)
        {
               if (name.toLowerCase()  === this.users[i].getName().toLowerCase())
               {
                return this.users[i].countAlerts()
               }
        }
    }

    countThemesForUser(name)
    {
        for(let i = 0; i < this.users.length; i++)
        {
               if (name.toLowerCase()  === this.users[i].getName().toLowerCase())
               {
              return this.users[i].countThemes()
               }
        }
    }
    countAlertsForUser(name)
    {
        for(let i = 0; i < this.users.length; i++)
        {
               if (name.toLowerCase()  === this.users[i].getName().toLowerCase())
               {
                return this.users[i].countAlerts()
               }
        }
    }
   
    countAlertsForTheme()
    {
        return this.alertsForTheme.length;
    }
    countAlertsGrupalForTheme()
    {
    var count= 0
    for(let i = 0; i < this.alertsForTheme.length; i++)
    {
        if(this.alertsForTheme[i].getIfIsGrupal())
        {
            count++;
        }
    }
    return count;
    }
    countAlertsIndividualForTheme()
    {
        var count= 0
    for(let i = 0; i < this.alertsForTheme.length; i++)
    {
        if(!this.alertsForTheme[i].getIfIsGrupal())
        {
            count++;
        }
    }
    return count;
    }

}

module.exports = { AppAlerts}

