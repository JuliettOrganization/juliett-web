
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const initialAirlineCodesWithAssignments = {
      'Standard Regions': {
 'FR - France': 'Europe',
  'GB - United Kingdom': 'Europe',
  'DE - Germany': 'Europe',
  'NL - Netherlands': 'Europe',
  'US - United States': 'North America',
  'CA - Canada': 'North America',
  'AU - Australia': 'Oceania',
  'NZ - New Zealand': 'Oceania',
  'JP - Japan': 'Asia',
  'CN - China': 'Asia',
  'IN - India': 'Asia',
  'BR - Brazil': 'South America',
  'RU - Russia': 'Europe',
  'ZA - South Africa': 'Africa',
  'MX - Mexico': 'North America',
  'AR - Argentina': 'South America',
  'CL - Chile': 'South America',
  'CO - Colombia': 'South America',
  'PE - Peru': 'South America',
  'VE - Venezuela': 'South America',
  'KR - South Korea': 'Asia',
  'SG - Singapore': 'Asia',
  'MY - Malaysia': 'Asia',
  'TH - Thailand': 'Asia',
  'VN - Vietnam': 'Asia',
  'ID - Indonesia': 'Asia',
  'PH - Philippines': 'Asia',
  'HK - Hong Kong': 'Asia',
  'TW - Taiwan': 'Asia',
  'SA - Saudi Arabia': 'Middle East',
  'AE - United Arab Emirates': 'Middle East',
  'IL - Israel': 'Middle East',
  'EG - Egypt': 'Africa',
  'NG - Nigeria': 'Africa',
  'KE - Kenya': 'Africa',
  'GH - Ghana': 'Africa',
  'DZ - Algeria': 'Africa',
  'MA - Morocco': 'Africa',
  'TN - Tunisia': 'Africa',
  'SN - Senegal': 'Africa',
  'CI - Ivory Coast': 'Africa',
  'ET - Ethiopia': 'Africa',
  'UG - Uganda': 'Africa',
  'TZ - Tanzania': 'Africa',
  'ZM - Zambia': 'Africa',
  'ZW - Zimbabwe': 'Africa',
  'BW - Botswana': 'Africa',
  'NA - Namibia': 'Africa',
  'MZ - Mozambique': 'Africa',
  'AO - Angola': 'Africa',
  'CD - Democratic Republic of the Congo': 'Africa',
  'CM - Cameroon': 'Africa',
  'ML - Mali': 'Africa',
  'BF - Burkina Faso': 'Africa',
  'NE - Niger': 'Africa',
  'TG - Togo': 'Africa',
  'BJ - Benin': 'Africa',
  'LR - Liberia': 'Africa',
  'SL - Sierra Leone': 'Africa',
  'GW - Guinea-Bissau': 'Africa',
  'GM - Gambia': 'Africa',
  'GN - Guinea': 'Africa',
  'MR - Mauritania': 'Africa',
  'LY - Libya': 'Africa',
  'SD - Sudan': 'Africa',
  'SS - South Sudan': 'Africa',
  'ER - Eritrea': 'Africa',
  'DJ - Djibouti': 'Africa',
  'SO - Somalia': 'Africa',
  'KM - Comoros': 'Africa',
  'MG - Madagascar': 'Africa',
  'MU - Mauritius': 'Africa',
  'SC - Seychelles': 'Africa',
  'RW - Rwanda': 'Africa',
  'BI - Burundi': 'Africa',
  'MW - Malawi': 'Africa',
  'LS - Lesotho': 'Africa',
  'SZ - Eswatini': 'Africa',
  'CV - Cape Verde': 'Africa',
  'ST - Sao Tome and Principe': 'Africa',
  'GQ - Equatorial Guinea': 'Africa',
  'GA - Gabon': 'Africa',
  'CG - Republic of the Congo': 'Africa',
  'CF - Central African Republic': 'Africa',
  'TD - Chad': 'Africa',
  'EH - Western Sahara': 'Africa',
      },

  'Custom Regions': {
    'FR - France': 'Not Allocated',
    'GB - United Kingdom': 'Not Allocated',
    'DE - Germany': 'Not Allocated',
    'NL - Netherlands': 'Not Allocated',
    'US - United States': 'Not Allocated',
    'CA - Canada': 'Not Allocated',
    'AU - Australia': 'Not Allocated',
    'NZ - New Zealand': 'Not Allocated',
    'JP - Japan': 'Not Allocated',
    'CN - China': 'Not Allocated',
    'IN - India': 'Not Allocated',
    'BR - Brazil': 'Not Allocated',
    'RU - Russia': 'Not Allocated',
    'ZA - South Africa': 'Not Allocated',
    'MX - Mexico': 'Not Allocated',
    'AR - Argentina': 'Not Allocated',
    'CL - Chile': 'Not Allocated',
    'CO - Colombia': 'Not Allocated',
    'PE - Peru': 'Not Allocated',
    'VE - Venezuela': 'Not Allocated',
    'KR - South Korea': 'Not Allocated',
    'SG - Singapore': 'Not Allocated',
    'MY - Malaysia': 'Not Allocated',
    'TH - Thailand': 'Not Allocated',
    'VN - Vietnam': 'Not Allocated',
    'ID - Indonesia': 'Not Allocated',
    'PH - Philippines': 'Not Allocated',
    'HK - Hong Kong': 'Not Allocated',
    'TW - Taiwan': 'Not Allocated',
    'SA - Saudi Arabia': 'Not Allocated',
    'AE - United Arab Emirates': 'Not Allocated',
    'IL - Israel': 'Not Allocated',
    'EG - Egypt': 'Not Allocated',
    'NG - Nigeria': 'Not Allocated',
    'KE - Kenya': 'Not Allocated',
    'GH - Ghana': 'Not Allocated',
    'DZ - Algeria': 'Not Allocated',
    'MA - Morocco': 'Not Allocated',
    'TN - Tunisia': 'Not Allocated',
    'SN - Senegal': 'Not Allocated',
    'CI - Ivory Coast': 'Not Allocated',
    'ET - Ethiopia': 'Not Allocated',
    'UG - Uganda': 'Not Allocated',
    'TZ - Tanzania': 'Not Allocated',
    'ZM - Zambia': 'Not Allocated',
    'ZW - Zimbabwe': 'Not Allocated',
    'BW - Botswana': 'Not Allocated',
    'NA - Namibia': 'Not Allocated',
    'MZ - Mozambique': 'Not Allocated',
    'AO - Angola': 'Not Allocated',
    'CD - Democratic Republic of the Congo': 'Not Allocated',
    'CM - Cameroon': 'Not Allocated',
    'ML - Mali': 'Not Allocated',
    'BF - Burkina Faso': 'Not Allocated',
    'NE - Niger': 'Not Allocated',
    'TG - Togo': 'Not Allocated',
    'BJ - Benin': 'Not Allocated',
    'LR - Liberia': 'Not Allocated',
    'SL - Sierra Leone': 'Not Allocated',
    'GW - Guinea-Bissau': 'Not Allocated',
    'GM - Gambia': 'Not Allocated',
    'GN - Guinea': 'Not Allocated',
    'MR - Mauritania': 'Not Allocated',
    'LY - Libya': 'Not Allocated',
    'SD - Sudan': 'Not Allocated',
    'SS - South Sudan': 'Not Allocated',
    'ER - Eritrea': 'Not Allocated',
    'DJ - Djibouti': 'Not Allocated',
    'SO - Somalia': 'Not Allocated',
    'KM - Comoros': 'Not Allocated',
    'MG - Madagascar': 'Not Allocated',
    'MU - Mauritius': 'Not Allocated',
    'SC - Seychelles': 'Not Allocated',
    'RW - Rwanda': 'Not Allocated',
    'BI - Burundi': 'Not Allocated',
    'MW - Malawi': 'Not Allocated',
    'LS - Lesotho': 'Not Allocated',
    'SZ - Eswatini': 'Not Allocated',
    'CV - Cape Verde': 'Not Allocated',
    'ST - Sao Tome and Principe': 'Not Allocated',
    'GQ - Equatorial Guinea': 'Not Allocated',
    'GA - Gabon': 'Not Allocated',
    'CG - Republic of the Congo': 'Not Allocated',
    'CF - Central African Republic': 'Not Allocated',
    'TD - Chad': 'Not Allocated',
    'EH - Western Sahara': 'Not Allocated',
      },

      'Contract AF Regions': {       
        'FR - France': 'Not Allocated',
        'GB - United Kingdom': 'Not Allocated',
        'DE - Germany': 'Not Allocated',
        'NL - Netherlands': 'Not Allocated',
        'US - United States': 'Not Allocated',
        'CA - Canada': 'Not Allocated',
        'AU - Australia': 'Not Allocated',
        'NZ - New Zealand': 'Not Allocated',
        'JP - Japan': 'Not Allocated',
        'CN - China': 'Not Allocated',
        'IN - India': 'Not Allocated',
        'BR - Brazil': 'Not Allocated',
        'RU - Russia': 'Not Allocated',
        'ZA - South Africa': 'Not Allocated',
        'MX - Mexico': 'Not Allocated',
        'AR - Argentina': 'Not Allocated',
        'CL - Chile': 'Not Allocated',
        'CO - Colombia': 'Not Allocated',
        'PE - Peru': 'Not Allocated',
        'VE - Venezuela': 'Not Allocated',
        'KR - South Korea': 'Not Allocated',
        'SG - Singapore': 'Not Allocated',
        'MY - Malaysia': 'Not Allocated',
        'TH - Thailand': 'Not Allocated',
        'VN - Vietnam': 'Not Allocated',
        'ID - Indonesia': 'Not Allocated',
        'PH - Philippines': 'Not Allocated',
        'HK - Hong Kong': 'Not Allocated',
        'TW - Taiwan': 'Not Allocated',
        'SA - Saudi Arabia': 'Not Allocated',
        'AE - United Arab Emirates': 'Not Allocated',
        'IL - Israel': 'Not Allocated',
        'EG - Egypt': 'Not Allocated',
        'NG - Nigeria': 'Not Allocated',
        'KE - Kenya': 'Not Allocated',
        'GH - Ghana': 'Not Allocated',
        'DZ - Algeria': 'Not Allocated',
        'MA - Morocco': 'Not Allocated',
        'TN - Tunisia': 'Not Allocated',
        'SN - Senegal': 'Not Allocated',
        'CI - Ivory Coast': 'Not Allocated',
        'ET - Ethiopia': 'Not Allocated',
        'UG - Uganda': 'Not Allocated',
        'TZ - Tanzania': 'Not Allocated',
        'ZM - Zambia': 'Not Allocated',
        'ZW - Zimbabwe': 'Not Allocated',
        'BW - Botswana': 'Not Allocated',
        'NA - Namibia': 'Not Allocated',
        'MZ - Mozambique': 'Not Allocated',
        'AO - Angola': 'Not Allocated',
        'CD - Democratic Republic of the Congo': 'Not Allocated',
        'CM - Cameroon': 'Not Allocated',
        'ML - Mali': 'Not Allocated',
        'BF - Burkina Faso': 'Not Allocated',
        'NE - Niger': 'Not Allocated',
        'TG - Togo': 'Not Allocated',
        'BJ - Benin': 'Not Allocated',
        'LR - Liberia': 'Not Allocated',
        'SL - Sierra Leone': 'Not Allocated',
        'GW - Guinea-Bissau': 'Not Allocated',
        'GM - Gambia': 'Not Allocated',
        'GN - Guinea': 'Not Allocated',
        'MR - Mauritania': 'Not Allocated',
        'LY - Libya': 'Not Allocated',
        'SD - Sudan': 'Not Allocated',
        'SS - South Sudan': 'Not Allocated',
        'ER - Eritrea': 'Not Allocated',
        'DJ - Djibouti': 'Not Allocated',
        'SO - Somalia': 'Not Allocated',
        'KM - Comoros': 'Not Allocated',
        'MG - Madagascar': 'Not Allocated',
        'MU - Mauritius': 'Not Allocated',
        'SC - Seychelles': 'Not Allocated',
        'RW - Rwanda': 'Not Allocated',
        'BI - Burundi': 'Not Allocated',
        'MW - Malawi': 'Not Allocated',
        'LS - Lesotho': 'Not Allocated',
        'SZ - Eswatini': 'Not Allocated',
        'CV - Cape Verde': 'Not Allocated',
        'ST - Sao Tome and Principe': 'Not Allocated',
        'GQ - Equatorial Guinea': 'Not Allocated',
        'GA - Gabon': 'Not Allocated',
        'CG - Republic of the Congo': 'Not Allocated',
        'CF - Central African Republic': 'Not Allocated',
        'TD - Chad': 'Not Allocated',
        'EH - Western Sahara': 'Not Allocated',
      },
    };

    return NextResponse.json(initialAirlineCodesWithAssignments);
  } catch (error) {
    console.error('Database error:', error); // Log the error to the console
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}