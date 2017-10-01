feature 'homepage' do # describe
  scenario 'return homepage' do # context
    visit('/')
    expect(page).to have_content 'Thermostat Controls'
    # page - current page
  end
end
