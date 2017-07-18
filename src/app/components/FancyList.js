import React from 'react'
import {
	BootstrapTable,
	TableHeaderColumn
	} from 'react-bootstrap-table'

var text = null
var search = []

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export default function FancyList(props) {
	const options = {
		clearSearch:true,
		searchDelayTime: 300,
		afterSearch: afterSearch
	}

	const selectRowProp = {
		mode: 'radio',
		clickToSelect: true,
		bgColor: 'grey',
		onSelect: onRowSelect,
		hideSelectColumn: true,
		selected: [props.value]
	}

	function afterSearch(searchText, result) {
		if(result.length == props.data.length) {
			result = []
		}
		let list = result.map( (e) => e.Nr).sort()
		if(!arraysEqual(list, search)) {
			search = list
			props.onSearch(list)	
		}
	}


	function onRowSelect(row, isSelected, e) {	
		props.onChange(row.Nr)
	}
	switch(props.domain) {
		case "Bostedsattraktivitet":
			var struktur = "Bostedsstruktur";
			break;
		case "Samlet attraktivitet":
			var struktur = "Samlet struktur";
			break;
		case "Næringsattraktivitet":
			var struktur = "Næringsstruktur";
			break;
	}
	
	if(props.inndeling == "kommune") {
	return(
		<BootstrapTable 
			data={props.data}
			options={options}
			selectRow={selectRowProp}
			bordered={false}
			hover
			striped
			height={400}
			search={true}
			tableStyle={{fontSize: "12px"}}

		>
			<TableHeaderColumn dataField="Nr" width="50px" isKey dataSort={true} columnTitle={false}> Nr </ TableHeaderColumn>
			<TableHeaderColumn dataField="Navn" dataSort={true} columnTitle={true}> Navn </TableHeaderColumn>
			<TableHeaderColumn dataField="Fylke" dataSort={true} columnTitle={true}> Fylke </TableHeaderColumn>
			<TableHeaderColumn dataField="Region" dataSort={true} columnTitle={true}> Region </TableHeaderColumn>
			<TableHeaderColumn dataField={props.domain} dataSort={true}> Attraktivitet </TableHeaderColumn>
			<TableHeaderColumn dataField={struktur} dataSort={true}> Struktur</TableHeaderColumn>

		</BootstrapTable>
	)
	}
	else {
	return(
		<BootstrapTable 
			data={props.data}
			options={options}
			selectRow={selectRowProp}
			bordered={false}
			hover
			striped
			height={400}
			search={true}
			tableStyle={{fontSize: "12px"}}

		>
			<TableHeaderColumn dataField="Nr" width="50px" isKey dataSort={true} columnTitle={false}> Nr </ TableHeaderColumn>
			<TableHeaderColumn dataField="Navn" width="150px" dataSort={true} columnTitle={true}> Navn </TableHeaderColumn>
			<TableHeaderColumn dataField={props.domain} width="150px" dataSort={true}> Attraktivitet </TableHeaderColumn>
			<TableHeaderColumn dataField={struktur} width="150px" dataSort={true}> Struktur</TableHeaderColumn>

		</BootstrapTable>
	)
	}
}
