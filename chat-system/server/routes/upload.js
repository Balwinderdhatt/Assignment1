// const formidable = require("formidable");

module.exports = (formidable, app) =>{
  app.post('/upload', (req, res)=>{
    var form = new formidable.IncomingForm({uploadDir: './images'});
    form.keepExtensions = true

    form.on('error', (err)=>{
      // throw err;
      res.send({
        result:"failed",
        data:{},
        numberOfImages: 0,
        message:  "Cannot Upload Image. " + err
      });
      throw err
    })

    form.on('fileBegin', (name, file)=>{
      file.path = form.uploadDir + "/" + file.name
    })

    form.on('file', (field, file)=>{
      console.log(file.path)
      res.send({
        result:"OK",
        data:{'filename': file.name, 'size':file.size , 'path': file.path},
        numberOfImages: 1,
        message:  "Upload Successful"
      })

    })

    form.parse(req)
  
  })
}