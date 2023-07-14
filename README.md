### Prereq

- tilt
- k3d
- kubectl

#### Add capacity to tilt binary

```
sudo setcap 'cap_net_bind_service=+ep' /usr/local/bin/tilt
```

#### Create local cluster

```
k3d cluster create newcluster --registry-create registry.localhost:12345
```

#### Tilt up

```
tilt up
```

### Destroy

```
Ctrl+C
tilt down
k3d cluster delete newcluster -a
```
