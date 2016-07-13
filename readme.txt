readme.txt

To build the docker image type the following at the same folder as the file named 'Dockerfile'

sudo docker build . 

To get the image name type

sudo docker images

To run the docker image type the following

sudo docker run -p 81:8081 -d <imageid>

Ensure the port is enabled in the digitalOcean host by using the following command lines:

# Shows all open DigitalOcean firewall ports
sudo ufw status verbose

# Opens DigitalOcean host firewall port 81
sudo ufw allow 81/tcp


