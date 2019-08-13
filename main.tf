provider "aws" {
    region = "us-west-1"
}
data "aws_ami" "ubuntu18" {
  most_recent      = true
  filter {
    name = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-bionic-18.04-amd64-server-*"]
  }
  owners = ["099720109477"]
}
resource "aws_instance" "Frontend" {
    ami = "${data.aws_ami.ubuntu18.id}"
    instance_type = "t2.medium"
    security_groups = ["${aws_security_group.ssh.name}"]
    key_name        = "${aws_key_pair.generated_key.key_name}"
    tags { Name = "frontend" }

    provisioner "remote-exec" {
    inline = [
      "sleep 20",
      "sudo curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -",
      "sudo apt install nginx curl git -y",
      "sudo apt install -y git nginx nodejs",
      "sudo ufw allow http",
      "/usr/bin/git clone https://github.com/codyde/cmbu-bootcamp-app -b grant && mkdir /tmp/app-frontend",
      "mv ./cmbu-bootcamp-app/frontend-tier/* /tmp/app-frontend && cd /tmp/app-frontend",
      "/usr/bin/npx @angular/cli analytics off",
      "sudo npm install -g @angular/cli",
      "npm install ",
      "ng build --prod",
      "sudo cp ./nginx/default.conf /etc/nginx/conf.d/",
      "sudo rm -rf /usr/share/nginx/html/*",
      "sudo cp -R /tmp/app-frontend/dist/cmbu-bootcamp-app/* /usr/share/nginx/html/",
      "sudo sed -i 's@root /var/www/html@root /usr/share/nginx/html@' /etc/nginx/sites-available/default",
      "sudo cp /tmp/app-frontend/nginx/default.conf /etc/nginx/conf.d/default.conf",
      "sudo rm -rf /etc/nginx/sites-available/default",
      "sudo sed -i 's@include /etc/nginx/sites-enabled/*@# include /etc/nginx/sites-enabled/*@' /etc/nginx/nginx.conf",
      "sudo sed -i 's@pyapi@${aws_instance.api.private_dns}@' /etc/nginx/conf.d/default.conf",
      "sudo systemctl restart nginx"
    ]

    connection {
      type        = "ssh"
      private_key = "${tls_private_key.example.private_key_pem}"
      user        = "ubuntu"
      timeout     = "1m"
    }
  }
}

resource "aws_instance" "api" {
    ami = "${data.aws_ami.ubuntu18.id}"
    instance_type = "t2.medium"
    security_groups = ["${aws_security_group.ssh.name}"]
    key_name        = "${aws_key_pair.generated_key.key_name}"
    tags { Name = "api" }

    provisioner "remote-exec" {
    inline = [
      "sleep 20",
      "sudo apt update -y",
      "sudo apt install python3-dev libpq-dev build-essential libssl-dev libffi-dev python3-setptools postgresql-dev -y",
      "sudo apt add repository universe && sudo apt update -y",
      "sudo ufw allow 80",
      "sudo apt install -y python-pip python3-pip",
      "sudo pip3 install --upgrade pip",
      "/usr/bin/git clone https://github.com/codyde/cmbu-bootcamp-app -b grant && mkdir /tmp/api-tier",
      "mv ./cmbu-bootcamp-app/app-tier/* /tmp/api-tier && cd /tmp/api-tier",
      "sudo pip3 install psycopg2-binary",
      "sudo pip3 install -r /tmp/api-tier/requirements.txt",
      "sudo pip install git+https://github.com/Supervisor/supervisor@master",
      "sudo mkdir /app && sudo cp app/* /app",
      "sudo cp app.conf /usr/supervisord.conf",
      "sudo supervisord -c /usr/supervisord.conf"
    ]
    }

    connection {
      type        = "ssh"
      private_key = "${tls_private_key.example.private_key_pem}"
      user        = "ubuntu"
      timeout     = "1m"
    }
}

resource "tls_private_key" "example" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "generated_key" {
  key_name   = "tfdemopair"
  public_key = "${tls_private_key.example.public_key_openssh}"
}

resource "aws_security_group" "ssh" {
  name        = "grant ssh"
  description = "grant ssh"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

    ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}