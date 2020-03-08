const getTableData = (req, res, db) => {
    db.select('*').from('doctor')
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  };
  const getTableLocation = (req, res, db) => {
  
    db.select('*').from('doctor').where('location', req.params.location)
   
  
    
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }


  module.exports = {
    getTableData,
    getTableLocation
  }