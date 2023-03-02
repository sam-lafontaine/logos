$(function() {
    // Generate Clearbit URL and company logo URL based on input
    function generateUrls() {
      var companyUrl = $(this).val();
      var clearbitUrl = "https://logo.clearbit.com/" + companyUrl;
      var companyLogoUrl = clearbitUrl + "?size=800" + "&format=png";
  
      $(this).closest("tr").find(".clearbit-url").text(clearbitUrl);
      $(this).closest("tr").find(".company-logo").attr("src", companyLogoUrl);
    }
  
    // Event listener to company URL input field
    $(".company-url").on("input", generateUrls);
  
    // Event listener to Add Row button
    $("#add-row").click(function() {
      var newRow =
        '<tr>' +
        '<td><input type="text" class="company-url"></td>' +
        '<td><span class="clearbit-url"></span></td>' +
        '<td><img class="company-logo" src=""></td>' +
        "</tr>";
  
      $("#company-table").append(newRow);
      $(".company-url").last().on("input", generateUrls);
    });
  
    // Event listener to Add Bulk button
    $("#add-bulk").click(function() {
      var urls = prompt("Enter a comma-separated list of company URLs:");
      var urlsArray = urls.split(/,\s*/);
  
      for (var i = 0; i < urlsArray.length; i++) {
        var newRow =
          '<tr>' +
          '<td><input type="text" class="company-url" value="' +
          urlsArray[i] +
          '"></td>' +
          '<td><span class="clearbit-url">' +
          "https://logo.clearbit.com/" +
          urlsArray[i] +
          "</span></td>" +
          '<td><img class="company-logo" src="' +
          "https://logo.clearbit.com/" +
          urlsArray[i] +
          '"></td>' +
          "</tr>";
  
        $("#company-table").append(newRow);
        $(".company-url")
          .last()
          .on("input", generateUrls);
      }
    });

    // Event listener for page reload
    $("#reload").click(function reloadPage() {
        location.reload();
    });
  });
