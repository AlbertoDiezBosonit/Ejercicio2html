const URL_SERVIDOR='http://localhost:3000/persons';


function cargarDatos(){
    // ahora cargamos todos los datos
    fetch(URL_SERVIDOR,{
        method:'GET',
        Headers:{
            'Content-Type':'application/json'
        }
    }
    )
    .then((response)=>response.json()
    .then(data=>{
        // ahora toca poner todos los campos de la primera persona
        const numElemento=0;
        if(data.length>numElemento){
            //debugger
            const elemento = data[numElemento];
            document.getElementById('usuario').value = elemento.user;
            document.getElementById('apellido').value = elemento.surname;
            document.getElementById('contrasena').value = elemento.password;
            document.getElementById('emaildelacompania').value = elemento.company_email;
            document.getElementById('emailpersonal').value = elemento.personal_email;
            document.getElementById('ciudad').value = elemento.city;
            document.getElementById('urlimagen').value = elemento.imagen_url;
            document.getElementById('fechacreacion').value = elemento.created_date;
            //document.getElementById('fechafinalizacion').value=data[numElemento].user;
            document.getElementById('id').value = elemento.id;
        }
    }))
}

function limpiarFormulario(){
    let formulario = document.getElementById('formulario');
    const lenFormulario = formulario.elements.length;
    for(i=0;i<lenFormulario;i++){
        let elemento = formulario.elements[i];
        if(elemento.type === 'text' || elemento.type === 'password' || elemento.type === 'email' || elemento.type === 'date')
            elemento.value="";
        else if(elemento.type === 'checkbox')
            elemento.checked=false;
    }
}

function enviarFormulario(event){
    // enviamos el formulario al servidor mediante fetch
    event.preventDefault(); // evitamos que se haga el submit
    const dataFormulario = new FormData(document.getElementById('formulario'));
    const value2 = Object.fromEntries(dataFormulario.entries());
    const data={
        user:document.getElementById('usuario').value,
        surname:document.getElementById('apellido').value,
        password:document.getElementById('contrasena').value,
        company_email:document.getElementById('emaildelacompania').value,
        personal_email:document.getElementById('emailpersonal').value,
        city:document.getElementById('ciudad').value,
        imagen_url:document.getElementById('urlimagen').value,
        created_date:document.getElementById('fechacreacion').value
    }
    //data[numElemento].=document.getElementById('fechafinalizacion').value;
    //data.id=document.getElementById('id').value; // pasamos la id mediante la llamada a la url

    fetch(URL_SERVIDOR+"/"+document.getElementById('id').value
    ,{
        //method:'POST', //este seria para incluir
        method:'PUT',
        headers:{ 'Content-Type':'application/json'},
        body:JSON.stringify(data)
        
    })/*.then((response)=>response.json() // la respuesta de momento no nos interesa
    .then(data2=>{
        if(data2.length>0){}
            //console.log(data2);
    })
    )*/
}

window.onload = function(){ 
    cargarDatos();
    // ahora asignamos los eventos
    document.getElementById('botonLimpiar').onclick = limpiarFormulario;
    document.getElementById('botonSubmit').onclick = enviarFormulario;
}

