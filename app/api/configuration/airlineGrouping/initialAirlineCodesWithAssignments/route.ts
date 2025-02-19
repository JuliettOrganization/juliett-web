import { NextResponse } from "next/server";

export async function GET() {
  try {
    const initialAirlineCodesWithAssignments = {
      "Airline Alliances": {
        "AF - Air France": "SkyTeam",
        "BA - British Airways": "Oneworld",
        "LH - Lufthansa": "Star Alliance",
        "KL - KLM": "SkyTeam",
        "AA - American Airlines": "Oneworld",
        "DL - Delta Air Lines": "SkyTeam",
        "UA - United Airlines": "Star Alliance",
        "SQ - Singapore Airlines": "Star Alliance",
        "CX - Cathay Pacific": "Oneworld",
        "QF - Qantas": "Oneworld",
        "EK - Emirates": "None",
        "QR - Qatar Airways": "Oneworld",
        "EY - Etihad Airways": "None",
        "NH - All Nippon Airways": "Star Alliance",
        "JL - Japan Airlines": "Oneworld",
        "KE - Korean Air": "SkyTeam",
        "MU - China Eastern Airlines": "SkyTeam",
        "CZ - China Southern Airlines": "SkyTeam",
        "CA - Air China": "Star Alliance",
        "BR - EVA Air": "Star Alliance",
        "CI - China Airlines": "SkyTeam",
        "TG - Thai Airways": "Star Alliance",
        "MH - Malaysia Airlines": "Oneworld",
        "GA - Garuda Indonesia": "SkyTeam",
        "VN - Vietnam Airlines": "SkyTeam",
        "AI - Air India": "Star Alliance",
        "AZ - Alitalia": "SkyTeam",
        "IB - Iberia": "Oneworld",
        "AY - Finnair": "Oneworld",
        "SK - SAS - Scandinavian Airlines": "Star Alliance",
        "OS - Austrian Airlines": "Star Alliance",
        "LX - Swiss International Air Lines": "Star Alliance",
        "SN - Brussels Airlines": "Star Alliance",
        "TP - TAP Air Portugal": "Star Alliance",
        "TK - Turkish Airlines": "Star Alliance",
        "SU - Aeroflot": "SkyTeam",
        "MS - EgyptAir": "Star Alliance",
        "ET - Ethiopian Airlines": "Star Alliance",
        "SA - South African Airways": "Star Alliance",
        "NZ - Air New Zealand": "Star Alliance",
        "VA - Virgin Australia": "None",
        "VS - Virgin Atlantic": "None",
        "AC - Air Canada": "Star Alliance",
        "WS - WestJet": "None",
        "AM - Aeromexico": "SkyTeam",
        "LA - LATAM Airlines": "None",
        "AV - Avianca": "Star Alliance",
        "CM - Copa Airlines": "Star Alliance",
        "G3 - Gol Transportes Aéreos": "None",
        "AD - Azul Brazilian Airlines": "None",
        "JJ - TAM Airlines": "None",
        "AR - Aerolineas Argentinas": "SkyTeam",
        "UX - Air Europa": "SkyTeam",
        "VY - Vueling": "None",
        "FR - Ryanair": "None",
        "U2 - easyJet": "None",
        "W6 - Wizz Air": "None",
        "DY - Norwegian Air Shuttle": "None",
        "PC - Pegasus Airlines": "None",
        "PS - Ukraine International Airlines": "None",
        "LO - LOT Polish Airlines": "Star Alliance",
        "OK - Czech Airlines": "SkyTeam",
        "RO - TAROM": "SkyTeam",
        "JU - Air Serbia": "None",
        "OU - Croatia Airlines": "Star Alliance",
        "BT - Air Baltic": "None",
        "FI - Icelandair": "None",
        "EI - Aer Lingus": "None",
        "MA - Malev Hungarian Airlines": "None",
      },

      "Contracts HQ": {
        "AF - Air France": "Not Allocated",
        "BA - British Airways": "Not Allocated",
        "LH - Lufthansa": "Not Allocated",
        "KL - KLM": "Not Allocated",
        "AA - American Airlines": "Not Allocated",
        "DL - Delta Air Lines": "Not Allocated",
        "UA - United Airlines": "Not Allocated",
        "SQ - Singapore Airlines": "Not Allocated",
        "CX - Cathay Pacific": "Not Allocated",
        "QF - Qantas": "Not Allocated",
        "EK - Emirates": "Not Allocated",
        "QR - Qatar Airways": "Not Allocated",
        "EY - Etihad Airways": "Not Allocated",
        "NH - All Nippon Airways": "Not Allocated",
        "JL - Japan Airlines": "Not Allocated",
        "KE - Korean Air": "Not Allocated",
        "MU - China Eastern Airlines": "Not Allocated",
        "CZ - China Southern Airlines": "Not Allocated",
        "CA - Air China": "Not Allocated",
        "BR - EVA Air": "Not Allocated",
        "CI - China Airlines": "Not Allocated",
        "TG - Thai Airways": "Not Allocated",
        "MH - Malaysia Airlines": "Not Allocated",
        "GA - Garuda Indonesia": "Not Allocated",
        "VN - Vietnam Airlines": "Not Allocated",
        "AI - Air India": "Not Allocated",
        "AZ - Alitalia": "Not Allocated",
        "IB - Iberia": "Not Allocated",
        "AY - Finnair": "Not Allocated",
        "SK - SAS - Scandinavian Airlines": "Not Allocated",
        "OS - Austrian Airlines": "Not Allocated",
        "LX - Swiss International Air Lines": "Not Allocated",
        "SN - Brussels Airlines": "Not Allocated",
        "TP - TAP Air Portugal": "Not Allocated",
        "TK - Turkish Airlines": "Not Allocated",
        "SU - Aeroflot": "Not Allocated",
        "MS - EgyptAir": "Not Allocated",
        "ET - Ethiopian Airlines": "Not Allocated",
        "SA - South African Airways": "Not Allocated",
        "NZ - Air New Zealand": "Not Allocated",
        "VA - Virgin Australia": "Not Allocated",
        "VS - Virgin Atlantic": "Not Allocated",
        "AC - Air Canada": "Not Allocated",
        "WS - WestJet": "Not Allocated",
        "AM - Aeromexico": "Not Allocated",
        "LA - LATAM Airlines": "Not Allocated",
        "AV - Avianca": "Not Allocated",
        "CM - Copa Airlines": "Not Allocated",
        "G3 - Gol Transportes Aéreos": "Not Allocated",
        "AD - Azul Brazilian Airlines": "Not Allocated",
        "JJ - TAM Airlines": "Not Allocated",
        "AR - Aerolineas Argentinas": "Not Allocated",
        "UX - Air Europa": "Not Allocated",
        "VY - Vueling": "Not Allocated",
        "FR - Ryanair": "Not Allocated",
        "U2 - easyJet": "Not Allocated",
        "W6 - Wizz Air": "Not Allocated",
        "DY - Norwegian Air Shuttle": "Not Allocated",
        "PC - Pegasus Airlines": "Not Allocated",
        "PS - Ukraine International Airlines": "Not Allocated",
        "LO - LOT Polish Airlines": "Not Allocated",
        "OK - Czech Airlines": "Not Allocated",
        "RO - TAROM": "Not Allocated",
        "JU - Air Serbia": "Not Allocated",
        "OU - Croatia Airlines": "Not Allocated",
        "BT - Air Baltic": "Not Allocated",
        "FI - Icelandair": "Not Allocated",
        "EI - Aer Lingus": "Not Allocated",
        "MA - Malev Hungarian Airlines": "Not Allocated",
      },

      "Contracts Local": {
        "AF - Air France": "Not Allocated",
        "BA - British Airways": "Not Allocated",
        "LH - Lufthansa": "Not Allocated",
        "KL - KLM": "Not Allocated",
        "AA - American Airlines": "Not Allocated",
        "DL - Delta Air Lines": "Not Allocated",
        "UA - United Airlines": "Not Allocated",
        "SQ - Singapore Airlines": "Not Allocated",
        "CX - Cathay Pacific": "Not Allocated",
        "QF - Qantas": "Not Allocated",
        "EK - Emirates": "Not Allocated",
        "QR - Qatar Airways": "Not Allocated",
        "EY - Etihad Airways": "Not Allocated",
        "NH - All Nippon Airways": "Not Allocated",
        "JL - Japan Airlines": "Not Allocated",
        "KE - Korean Air": "Not Allocated",
        "MU - China Eastern Airlines": "Not Allocated",
        "CZ - China Southern Airlines": "Not Allocated",
        "CA - Air China": "Not Allocated",
        "BR - EVA Air": "Not Allocated",
        "CI - China Airlines": "Not Allocated",
        "TG - Thai Airways": "Not Allocated",
        "MH - Malaysia Airlines": "Not Allocated",
        "GA - Garuda Indonesia": "Not Allocated",
        "VN - Vietnam Airlines": "Not Allocated",
        "AI - Air India": "Not Allocated",
        "AZ - Alitalia": "Not Allocated",
        "IB - Iberia": "Not Allocated",
        "AY - Finnair": "Not Allocated",
        "SK - SAS - Scandinavian Airlines": "Not Allocated",
        "OS - Austrian Airlines": "Not Allocated",
        "LX - Swiss International Air Lines": "Not Allocated",
        "SN - Brussels Airlines": "Not Allocated",
        "TP - TAP Air Portugal": "Not Allocated",
        "TK - Turkish Airlines": "Not Allocated",
        "SU - Aeroflot": "Not Allocated",
        "MS - EgyptAir": "Not Allocated",
        "ET - Ethiopian Airlines": "Not Allocated",
        "SA - South African Airways": "Not Allocated",
        "NZ - Air New Zealand": "Not Allocated",
        "VA - Virgin Australia": "Not Allocated",
        "VS - Virgin Atlantic": "Not Allocated",
        "AC - Air Canada": "Not Allocated",
        "WS - WestJet": "Not Allocated",
        "AM - Aeromexico": "Not Allocated",
        "LA - LATAM Airlines": "Not Allocated",
        "AV - Avianca": "Not Allocated",
        "CM - Copa Airlines": "Not Allocated",
        "G3 - Gol Transportes Aéreos": "Not Allocated",
        "AD - Azul Brazilian Airlines": "Not Allocated",
        "JJ - TAM Airlines": "Not Allocated",
        "AR - Aerolineas Argentinas": "Not Allocated",
        "UX - Air Europa": "Not Allocated",
        "VY - Vueling": "Not Allocated",
        "FR - Ryanair": "Not Allocated",
        "U2 - easyJet": "Not Allocated",
        "W6 - Wizz Air": "Not Allocated",
        "DY - Norwegian Air Shuttle": "Not Allocated",
        "PC - Pegasus Airlines": "Not Allocated",
        "PS - Ukraine International Airlines": "Not Allocated",
        "LO - LOT Polish Airlines": "Not Allocated",
        "OK - Czech Airlines": "Not Allocated",
        "RO - TAROM": "Not Allocated",
        "JU - Air Serbia": "Not Allocated",
        "OU - Croatia Airlines": "Not Allocated",
        "BT - Air Baltic": "Not Allocated",
        "FI - Icelandair": "Not Allocated",
        "EI - Aer Lingus": "Not Allocated",
        "MA - Malev Hungarian Airlines": "Not Allocated",
      },
    };

    return NextResponse.json(initialAirlineCodesWithAssignments);
  } catch (error) {
    console.error("Database error:", error); // Log the error to the console
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
