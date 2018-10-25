# app.py - a minimal flask api using flask_restful
from flask import Flask
from flask_restful import Resource, Api
import docker

app = Flask(__name__)
api = Api(app)

class Index(Resource):
    def get(self):
        return "Index page"

class Info(Resource):
    def get(self):
        return client.info()

class Version(Resource):
    def get(self):
        return client.version()

class Images(Resource):
    def get(self):
        imagetable = []
        for image in client.images.list():
            imagetable.append(image.attrs)
        return imagetable

class Containers(Resource):
    def get(self):
        containertable = []
        for container in client.containers.list(all=True):
            containertable.append(container.attrs)
        return containertable


client = docker.from_env()
api.add_resource(Index, '/')
api.add_resource(Info, '/info')
api.add_resource(Version, '/version')
api.add_resource(Images, '/images')
api.add_resource(Containers, '/containers')


if __name__ == '__main__':
    print("############ Docker docking status ############")
    print(client.version())
    print("###############################################")
    app.run(debug=True, host='0.0.0.0')
