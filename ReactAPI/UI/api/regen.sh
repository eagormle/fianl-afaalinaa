#! /bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

URL=http://localhost:5264/swagger/v1/swagger.json

openapi-generator generate -i $URL --skip-validate-spec --generator-name typescript-fetch --type-mappings DateTimeOffset=string --additional-properties=typescriptThreePlus=true -o $DIR/src