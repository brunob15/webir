# POC Scrapping Tienda Inglesa

Se necesita una instancia de ElasticSearch corriendo: https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html


Correr en la consola:

```
npm install
node index.js
```

Para obtener todos los productos de ElasticSearch:
```
curl -X GET \
  'http://localhost:9200/products/_search?filter_path=hits.hits._source,hits.total.value&size=1000' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 40474e03-3fe5-4112-bf0c-d9c21653d0c8' \
  -H 'cache-control: no-cache' \
  -d '{
  "query": {
    "match_all": { }
  }
}'
```

Para borrar todos los productos de ElasticSearch:
```
curl -X DELETE \
  http://localhost:9200/products \
  -H 'Postman-Token: 1ab568f4-43dd-4dc2-9154-3030b15edb3a' \
  -H 'cache-control: no-cache'
```