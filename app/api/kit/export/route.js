import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { items = [], kitName = 'Playstate Kit Checklist' } = await request.json();
    const date = new Date().toLocaleDateString('en-US', { dateStyle: 'full' });

    let text = `=======================================================\n`;
    text += ` PLAYSTATE OUTDOOR SPORTS — KIT CHECKLIST\n`;
    text += ` ${kitName.toUpperCase()}\n`;
    text += ` Generated: ${date}\n`;
    text += `=======================================================\n\n`;

    let total = 0;
    items.forEach((item, index) => {
      const itemTotal = (item.price || 0) * (item.quantity || 1);
      total += itemTotal;
      text += `${(index + 1).toString().padStart(2, '0')}. [ ] ${item.name}\n`;
      text += `    Sport / Option: ${item.sport || ''} · ${item.selected_option || 'Standard'}\n`;
      text += `    Qty: ${item.quantity || 1}  x  ₹${(item.price || 0).toLocaleString()}  =  ₹${itemTotal.toLocaleString()}\n\n`;
    });

    text += `-------------------------------------------------------\n`;
    text += ` Total Guide Price: ₹${total.toLocaleString()}\n`;
    text += ` Total Items Count: ${items.length}\n`;
    text += `\n Play hard. Play fair. Leave it all on the field.\n`;
    text += ` PLAYSTATE · OUTDOOR ATHLETIC CULTURE\n`;

    return new Response(text, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'attachment; filename="playstate-kit.txt"',
      },
    });
  } catch (e) {
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
