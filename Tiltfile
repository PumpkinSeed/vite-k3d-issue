# Check whether the developer wants to start it on the local cluster.
# If you want to start it on an other context, put it into the list
allow_k8s_contexts([
  'k3d-newcluster'
])

location = "."
tag = "k3d-registry.localhost:12345/test"
resource_definition = './zarf/test.yaml'

docker_build(tag, location, dockerfile="./Dockerfile", ssh='default', live_update=[sync(location, '/home/node/app')])
k8s_yaml(read_file(resource_definition))

k8s_yaml(read_file('zarf/nginx.yaml'))
k8s_resource('nginx', port_forwards=['0.0.0.0:80:80'])
