$(function(){
  // Header has to be embiggened
  $('ul#account-navigation li.truncate').css('width',290);
  // Cache the current kit editor link
  var $curr_kit = $('.kit-editor-link');
  // Clone the current kit editor link and create our button
  $curr_kit
    .clone()
    // Avoid conflict
    .removeClass('.kit-editor-link')
    // Use our own attributes
    .attr({'href':'#', 'id':'republish-all-link'})
    // Use our own pretty blue styling
    .css({'margin-left': 5, 'background-color': '#3380cc', 'border-color': '#3380cc', 'outline-color': '#1a1d20', 'text-shadow': '#1a1d20 1px 1px 0'})
    .text('Republish All Kits')
    // What to do when it gets clicked
    .click(function() {
      // Cache the button object
      var $button = $(this);
      // Gotta put the ids somewhere
      var kit_ids = [];
      // Get and push the currently selected kit's id (it's in the kit edit button's href)
      kit_ids.push($curr_kit.attr('href'));
      // Gather the rest of the kit ids (they're in the actions of the forms)
      $('#global-kit-navigation li form').each(function(){
        kit_ids.push($(this).attr('action'));
      });
      var num_repubs = 0;
      // For each kit id string
      $.each(kit_ids, function(k, v) {
        // Get the actual id out of the string
        var kit_id = v.replace(/[^0-9]/g, '');
        // POST to the right URLs (this republishes the kits) with the same data the real form uses
        $.post('/kits/' + kit_id + '/publish', {'submit': 'Publish', '_method': 'put', 'allow_over_size_limit': 1}, function(data, textStatus, xhr) {
          // If it worked
          if (textStatus == 'success') {
            // Increase the number of republished kits, or just say "All" if we've done them all
            $button.text('Republished ' + (++num_repubs < kit_ids.length ? num_repubs : 'All') + ' Kits');
          }
        }, 'text');
      });
      return false;
    })
    // Append it to the kit nav
    .appendTo('#global-kit-navigation');
});