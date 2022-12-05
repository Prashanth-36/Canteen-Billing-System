$(document).on('keydown', '.search', function() {
    $(".search").autocomplete({
        source:(req,res)=>{
            $.ajax({
                url:"/admin/autocomplete/",
                type: "GET",
                data:req,
                dataType:"jsonp",
                success:(data)=>{
                    res(data);
                },
                error:(err)=>{
                    console.log(err.status);
                }
            });
        }
    });
});

function details(elem) {
    var r=elem.parentNode.parentNode;
    var search=r.querySelector(".search").value;
    $.ajax({
        url:"/admin/details/",
        type: "GET",
        data:{name:search},
        dataType:"jsonp",
        success:(data)=>{
            console.log(data);
            if(data){
                r.querySelector(".pdtid").value=data.productId;
                r.querySelector(".price").value=data.price;
                r.querySelector(".qty").value=1;
                total(elem);
            }else{
                r.querySelector(".pdtid").value="";
                r.querySelector(".price").value="";
                r.querySelector(".qty").value="";
            }
        },
        error:(err)=>{
            console.log(err.status);
        }
    });
}
function addRow(){
    var table=document.getElementById("items");
    var row=table.insertRow(table.rows.length-2);
    var c0=row.insertCell(0);
    var c1=row.insertCell(1);
    var c2=row.insertCell(2);
    var c3=row.insertCell(3);
    var c4=row.insertCell(4);
    var c5=row.insertCell(5);
    c0.innerHTML="<input type='text' name='pdtid[]' class='pdtid' required>";
    c1.innerHTML="<input type='text' name='pdtname[]'  class='pdtname search' onchange='details(this)' required>";
    c2.innerHTML="<input type='number' name='price[]' class='price' readonly>";
    c3.innerHTML="<input type='number' name='qty[]' class='qty' onchange='total(this)'  required>";
    c4.innerHTML="<input type='number' name='total[]' class='total' disabled>";
    c5.innerHTML="<button type='button' onclick='deleteRow(this)' class='danger'>Cancel</button>";
}

function deleteRow(o) {
    var table=document.getElementById("items");
    var rows=table.rows.length;
    if(rows>4){
        var p=o.parentNode.parentNode;
        p.parentNode.removeChild(p);
    }
}

function total(e) {
    var r = e.parentNode.parentNode;
    var qty=r.querySelector(".qty").value;
    var price=r.querySelector(".price").value;
    var tot=qty*price;
    r.querySelector(".total").value=tot;
    var totAmt=0;
    var totals=document.getElementsByClassName("total");
    for(let i=0;i<totals.length;i++){
        totAmt+=Number(totals[i].value);
    }
    document.getElementById("totalAmt").innerHTML=totAmt;
}