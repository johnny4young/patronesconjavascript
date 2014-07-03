var inicio = {
    vivir: function() {
        console.log("funciona");
    }
};
//inicio.vivir();

//creación de clases, 3 formas
var newobjeto = {};
var nuevoobjeto = Object.create(Object.prototype);
var nuevoobjeto = new Object();


//closure
console.log("closure----------------");

function incremetar(inicio, paso) {
    return function() {
        inicio += paso;
        return inicio;
    };
};

var incremento = incremetar(20, 2);
console.log(incremento());
console.log(incremento());

//pregunta 1
var resultado = [];
var resultado2 = [];
for (var i = 0; i < 5; i++) {
    resultado.push(function() {
        return i;
    });
    resultado2[i] = i;
}
console.log(resultado[3]());
console.log(resultado2[3]);

//pregunta 2
var count = 0;

function foo() {
    try {
        return count;
    } finally {
        count++;
    }
}
console.log(foo());
console.log(count);

//pregunta 3 

//x=== y  sea true
// 1/x > 1/y sea true
//x +0 , y -0


console.log("constructores----------");
//constructores
function carro(modelo, year, millas) {
    this.modelo = modelo;
    this.year = year;
    this.millas = millas;

    this.toString = function() {
        return this.modelo + " ha hecho " + this.millas + " millas";
    };
}

var honda = new carro("hoda civic", 2013, 20000);

var suzuki = new carro();

console.log(honda.toString());
console.log(suzuki.toString()); //constructor no existente, genera undefined

//constructores co prototipos
carro.prototype.Edad = function() {
    return "el model es del año " + this.year;
};
console.log(honda.Edad());


//encapsulamiento

var encapsulamiento = (
    function() {
        privadoVariable1 = "soy una variable privada";

        var aleatorio = Math.random();

        privadoFuncion1 = function() {
            console.log("soy la función privada 1");
        };

        return {
            publicafuncion1: function() {
                console.log("soy una función pública 1");
            },
            publicaAleatorio: function() {
                return aleatorio;
            },
            publicaVariable1: "soy una variable pública"
        };
    }
)();


console.log(encapsulamiento.publicaVariable1);

//forma mejorada

var encapsulamiento2 = (
    function() {
        privadoVariable1 = "soy una variable privada";
        publicaVariable1 = "soy una variable pública";

        privadoFuncion1 = function() {
            console.log("soy la función privada 1");
        };
        publicafuncion1 = function() {
            console.log("soy una función pública 1");
        };

        return {
            publicavariable1: publicaVariable1,
            publicafuncion1: publicafuncion1


        };
    }
)();

console.log(encapsulamiento2.privadoVariable1);

//singleton
console.log("singleton----------");
var malsingleton = function() {
    this.prop1 = 1;
    this.pro2 = 2;
    this.meth = function() {
        return this.prop1;
    }
};

var ob1 = new malsingleton();
ob1.prop1 = 3;
console.log(ob1.meth());

var ob2 = new malsingleton();
console.log(ob2.meth());




var singleton = (function() {
    var instancia;

    function iniciar() {
        return {
            prop1: 1,
            pro2: 2,
            meth: function() {
                return this.prop1;
            }
        }
    }

    return {
        getInstancia: function() {
            if (!instancia) {
                instancia = iniciar();
            }

            return instancia;
        }
    }
})();

var sing1 = singleton.getInstancia();
sing1.prop1 = 3;
console.log(sing1.prop1);

var sing2 = singleton.getInstancia();
console.log(sing2.prop1);

console.log("prototype----------");

//prototipe
var carro = {
    nombre: "mazda",
    conducir: function() {
        console.log("ahh conducir como una muñeca");
    }

};
var micarro = Object.create(carro);
console.log(micarro.nombre);

//mixin
console.log("mixin---------");

var persona = function(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
};

var johnny = new persona("johnny", "young");

var superheroe = function(nombre, apellido, poderes) {
    //llama al constructor de la clase
    persona.call(this, nombre, apellido);

    this.poderes = poderes;
};

superheroe.prototype = Object.create(persona.prototype);

var superjohnny = new superheroe("johnny", "young", ["desplegar sin compilar"]);
console.log(superjohnny);


//eso es un mixin con la metodología del DRY
var mymixins = {
    moverarriba: function() {
        console.log("mover arriba");
    },
    moverabajo: function() {
        console.log("mover abajos");
    },
    detener: function() {
        console.log("detener");
    }
};


function animacionjohnny() {
    this.moverIzquierda = function() {
        console.log("mover izquierda");
    };
};

//quiero extenderlo?? como DRY con underscore.js

_.extend(animacionjohnny.prototype, mymixins);


var animacionpoderosa = new animacionjohnny();

animacionpoderosa.moverIzquierda();
animacionpoderosa.moverarriba();


//más de underscore, extras

console.log(_.min([10, 5, 100, 2, 1000]));

//MVC* usaremos backbone porque angularjs lo usaremos en otra presentación
//pantalla de calculo de area de un rectángulo
console.log("backbone mvc--------------------");

//modelo
var Rectangulo = Backbone.Model.extend({
    defaults: {
        alto: 4,
        ancho: 3,
    },
    area: function() {
        return this.get('alto') * this.get('ancho');
    },
    toTemplateJSON: function() {
        var json = this.toJSON(); //qué devuelve?  console.log(json);       
        json.area = this.area();
        return json;
    }
});

//vista y controlador, se definen juntos
var Vista = Backbone.View.extend({
    el: '#area', // las partes vista controlador son de este elemento, podemos segmentar las vistacontrolador
    events: {
        "change input[name='alto']": 'onChangeAlto',
        "change input[name='ancho']": 'onChangeAncho'
    },

    initialize: function() {
        _.bindAll(this, 'render', 'onChangeAlto', 'onChangeAncho'); //esto es para conservar una referencia this en el bindeo

        this.model = new Rectangulo();
        this.model.on('change', this.render); //cuando se produzca un cambio en el modelo change:alto es para solo el "alto" cambio

        this.render();
    },

    onChangeAlto: function() {
        var v = parseInt($("input[name='alto']", this.el).val());
        this.model.set('alto', v);
    },

    onChangeAncho: function() {
        var v = parseInt($("input[name='ancho']", this.el).val());
        this.model.set('ancho', v);
    },

    render: function() {
        $("input[name='alto']", this.el).val(this.model.get('alto'));
        $("input[name='ancho']", this.el).val(this.model.get('ancho'));

        var texto = _.template('El área de un rectángulo de alto <%=alto %> y ancho <%=ancho %> es <b><%=area%></b>', this.model.toTemplateJSON());
        $('#resultado', this.el).html(texto);
    },
});

//iniciar la vista
var v = new Vista();



//mejores prácticas en un proyecto