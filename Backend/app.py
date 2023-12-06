from flask import Flask, jsonify ,request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend

# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://nelfervi:prueba1234@nelfervi.mysql.pythonanywhere-services.com/nelfervi$com_reg'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow

# defino las tablas
class Receta(db.Model):   # la clase Receta hereda de db.Model
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    imagen=db.Column(db.String(400))
    ingred=db.Column(db.String(400))
    prepar=db.Column(db.String(5000))
    def __init__(self,nombre,imagen,ingred,prepar):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.imagen=imagen
        self.ingred=ingred
        self.prepar=prepar

''' class Local(db.Model):   # la clase Local hereda de db.Model
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    direcc=db.Column(db.String(100))
    imagen=db.Column(db.String(400))
    ubicac=db.Column(db.String(400))
    def __init__(self,nombre,direcc,imagen,ubicac):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.direcc=direcc
        self.imagen=imagen
        self.ubicac=ubicac '''

    #  si hay que crear mas tablas , se hace aqui

with app.app_context():
    db.create_all()  # aqui crea todas las tablas
#  ************************************************************
class ProductoSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','imagen','ingred','prepar')

producto_schema=ProductoSchema()            # El objeto producto_schema es para traer un producto
productos_schema=ProductoSchema(many=True)  # El objeto productos_schema es para traer multiples registros de producto

# crea los endpoint o rutas (json)
@app.route('/productos',methods=['GET'])
def get_Productos():
    all_productos=Receta.query.all()         # el metodo query.all() lo hereda de db.Model
    result=productos_schema.dump(all_productos) # el metodo dump() lo hereda de ma.schema y
                                                # trae todos los registros de la tabla
    return jsonify(result)                      # retorna un JSON de todos los registros de la tabla

@app.route('/productos/<id>',methods=['GET'])
def get_producto(id):
    producto=Receta.query.get(id)
    return producto_schema.jsonify(producto)   # retorna el JSON de un producto recibido como parametro

@app.route('/productos/<id>',methods=['DELETE'])
def delete_producto(id):
    producto=Receta.query.get(id)
    db.session.delete(producto)
    db.session.commit()                     # confirma el delete
    return producto_schema.jsonify(producto) # me devuelve un json con el registro eliminado

@app.route('/productos', methods=['POST']) # crea ruta o endpoint
def create_producto():
    #print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    imagen=request.json['imagen']
    ingred=request.json['ingred']
    prepar=request.json['prepar']
    new_producto=Receta(nombre,imagen,ingred,prepar)
    db.session.add(new_producto)
    db.session.commit() # confirma el alta
    return producto_schema.jsonify(new_producto)

@app.route('/productos/<id>', methods=['PUT'])
def update_producto(id):
    producto=Receta.query.get(id)
    producto.nombre=request.json['nombre']
    producto.imagen=request.json['imagen']
    producto.ingred=request.json['ingred']
    producto.prepar=request.json['prepar']
    db.session.commit()    # confirma el cambio
    return producto_schema.jsonify(producto)    # y retorna un json con el producto

@app.route('/')
def hello_world():
    return 'Hello from Flask!'
