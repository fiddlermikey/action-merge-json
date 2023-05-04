# Merge json files

This action is designed to merge two (2) json files together. Specify the input file with new json data and library file where the data will be merged into. Optionally you can specify the root path for the json object.

## Inputs

### `input-file`

**Required** The name of the file with data to be merged into another file. This will overwrite data if the same key exists

### `library-file`

**Required** The name of the master file to be combined with the data in 'input-file'

### `new-json-path`

**Optional** The path to the object in the input-file to grab json data (recursively). Blank will merge fromt he root

### `old-json-path`

**Optional** The path to the object in the input-file to grab json data (recursively). Blank will merge fromt he root


## Outputs

### `time`

For debugging purposes

## Example usage

```yaml
uses: actions/action-merge-json@v1.0
with:
	input-file: integ-store-types.json
	library-file: ./json-temp/store-types/store-types.json
	new-json-path: 'path.to.object'
	old-json-path: 'path.to.insert.into'

```