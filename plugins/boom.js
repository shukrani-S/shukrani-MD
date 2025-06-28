const {ezra} = require("../fredi/ezra");
const conf = require("../set");

// Work for Boom message 
ezra(
  {
    nomCom: 'boom',
    categorie: 'Fredi-Fun',
    reaction: '😈',
  }, 

  

  async (dest,zk, commandeOptions) => {
    const {ms,arg,repondre,superUser} = commandeOptions;
    const limit = conf.BOOM_MESSAGE_LIMIT;

    if (!superUser) {
      repondre('You are not authorised to use this  command !!!');
      return;
    } else{
          if (!arg[0] || !arg[1] || arg[0] < 0){
            repondre(`
error wrong format
> try: ${conf.PREFIXE}boom 10 hey `);
              return;
          } else if (parseInt(arg[0]) > limit) {
            repondre(`can't send over ${limit} maessages`)
            return;
            } else {
            const tasks = []

            for (let i = 0 ; i < parseInt(arg[0]); i++){
              tasks.push(
                new Promise((resolve) => {
                  setTimeout(function() {
                    repondre(arg.slice(1).join(" "));
                    resolve();
                  }, 1000 * i);
                })
              )
            }

            await Promise.all(tasks)
            return;
            }
    }
  }
);
