POST /flags HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 96

{
  "flagName": "newd-ai-feature",
  "description": "AI model v2",
  "enabledByDefault": true
}


GET /flags HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 96

{
  "flagName": "newd-ai-feature",
  "description": "AI model v2",
  "enabledByDefault": true
}

POST /clients HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 48

{
  "clientId": "abc123",
  "name": "Client A"
}

POST /clients/abc123/flags HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 85

{
  "flagName": "new-ai-feature",
  "enabled": false,
  "environment": "production"
}