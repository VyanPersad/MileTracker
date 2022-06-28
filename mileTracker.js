
$(function () {
    $('.date').each(function () {
        $(this).datepicker();
    });
});

$(document).one('pageinit', function () {
    showItems();
    //Add Handler
    $('#submitItem').on('tap', addItem);
    $('#submitEditItem').on('tap', editItem);
    $('#clearData').on('tap', clearData);
    $('#stats').on('tap', '#editLink', setCurrent);
    $('#stats').on('tap', '#deleteLink', delItem);
    //Show Items
    function showItems() {
        var Items = getItemObject();
        if (Items != '' && Items != null) {
            for (var i = 0; i < Items.length; i++) {
                $('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong>' + Items[i]["date"] +
                    ' <br><strong>Items:</strong>' + Items[i]["itemtoAdd"] + '<div class="controls">' +
                    '<a href="#edit" id="editLink" data-item="' + Items[i]["itemtoAdd"] + '" data-date="' + Items[i]["date"] + '">Edit</a> | <a href="#" id="deleteLink" data-item="' + Items[i]["itemtoAdd"] + '" data-date="' + Items[i]["date"] + '" onclick="return confirm(\'Are you sure?\')">Delete</a></div></li>');
            }
            $('#home').bind('pageinit', function () {
                $('#stats').listview('refresh');
            });
        } else {
            $('#stats').html('<p>You have no logged items</p>');
        }
    }
    //Add Run
    function addItem() {
        //alert("It works");
        //Get form values
        var itemtoAdd = $('#addItems').val();
        var date = $('#addDate').val();

        var item = {
            date: date,
            itemtoAdd: parseFloat(itemtoAdd),
        };

        var Items = getItemObject();
        Items.push(item);
        alert("Item Added");
        localStorage.setItem('Items', JSON.stringify(Items));
        window.location.href = "mileTracker.html";
        return false;
    }

    function editItem() {
        //alert("It works");
        //Get form values
        currentItem = localStorage.getItem('currentItem');
        currentDate = localStorage.getItem('currentDate');

        var Items = getItemObject();
        for (var i = 0; i < Items.length; i++) {
            if (Items[i].itemtoAdd == currentItem && Items[i].date == currentDate) {
                Items.splice(i, 1);
            }
            localStorage.setItem('Items', JSON.stringify(Items));
        }

        var itemtoAdd = $('#editItems').val();
        var date = $('#editDate').val();

        var edit_item = {
            date: date,
            itemtoAdd: parseFloat(itemtoAdd),
        };

        Items.push(edit_item);
        alert("Item Updated");
        localStorage.setItem('Items', JSON.stringify(Items));
        window.location.href = "mileTracker.html";
        return false;
    }

    function delItem() {
        localStorage.setItem('currentItem', $(this).data('item'));
        localStorage.setItem('currentDate', $(this).data('date'));

        currentItem = localStorage.getItem('currentItem');
        currentDate = localStorage.getItem('currentDate');

        var Items = getItemObject();
        for (var i = 0; i < Items.length; i++) {
            if (Items[i].itemtoAdd == currentItem && Items[i].date == currentDate) {
                Items.splice(i, 1);
            }
            localStorage.setItem('Items', JSON.stringify(Items));
        }

        alert("Item Deleted");
        window.location.href = "mileTracker.html";
        return false;
    }

    function clearData() {
        localStorage.removeItem('Items');
        $('#stats').html('<p>You have no logged items</p>');
    }

    function getItemObject() {
        var Items = new Array();
        var currentItems = localStorage.getItem('Items');

        if (currentItems != null) {
            var Items = JSON.parse(currentItems);
        }

        return Items.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date)
        });
    }

    function setCurrent() {
        localStorage.setItem('currentItem', $(this).data('item'));
        localStorage.setItem('currentDate', $(this).data('date'));

        $('#editItems').val(localStorage.getItem('currentItem'));
        $('#editDate').val(localStorage.getItem('currentDate'));
    }
});