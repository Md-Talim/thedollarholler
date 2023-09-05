<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { Button } from '$lib/components';
  import { Trash } from '$lib/components/Icons';
  import type { LineItem } from '../../../global';
  import LineItemRows from './LineItemRows.svelte';

  const blankLineItem = {
    id: uuidv4(),
    description: '',
    quantity: 0,
    amount: 0
  };

  let lineItems: LineItem[] = [{ ...blankLineItem }];

  const AddLineItem = () => {
    lineItems = [...lineItems, { ...blankLineItem, id: uuidv4() }];
  };

  const RemoveLineItem = (event: { detail: string }) => {
    if (lineItems.length <= 1) return;
    lineItems = lineItems.filter((item) => item.id !== event.detail);
  };

  const UpdateLineItems = () => {
    lineItems = lineItems;
  };
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">Add an Invoice</h2>

<form class="grid grid-cols-6 gap-x-5">
  <!-- Client -->
  <div class="field col-span-2">
    <label for="client">Client</label>
    <select name="client" id="client">
      <option value="zeal">Zeal</option>
    </select>
  </div>
  <div class="field col-span-2 flex items-end gap-x-5">
    <div class="text-base font-bold leading-[3.5rem] text-monsoon">or</div>
    <Button label="+ Client" onClick={() => {}} style="outline" isAnimated={false} />
  </div>

  <!-- Invoice Id -->
  <div class="field col-span-2">
    <label for="id">Invoice Id</label>
    <input type="number" name="id" />
  </div>

  <!-- Due Date -->
  <div class="field col-span-2">
    <label for="dueDate">Due Date</label>
    <input type="date" name="dueDate" />
  </div>

  <!-- Issue Date -->
  <div class="field col-span-2 col-start-5">
    <label for="issueDate">Issue Date</label>
    <input type="date" name="issueDate" />
  </div>

  <!-- Subject -->
  <div class="field col-span-6">
    <label for="subject">Subject</label>
    <input type="text" name="subject" />
  </div>

  <!-- Line Items -->
  <div class="field col-span-6">
    <LineItemRows
      {lineItems}
      on:addlineItem={AddLineItem}
      on:removeLineItem={RemoveLineItem}
      on:updateLineItems={UpdateLineItems}
    />
  </div>

  <!-- Notes -->
  <div class="field col-span-6">
    <label for="notes"
      >Notes <span class="font-normal">(optional, displayed on the invoice)</span></label
    >
    <textarea name="notes" id="notes" />
  </div>

  <!-- Terms -->
  <div class="field col-span-6">
    <label for="terms">
      Terms <span class="font-normal">(optional, enter your terms & conditions)</span>
    </label>
    <textarea name="terms" id="terms" />
    <div class="text-xs text-gray-400">
      Formatting Tips: <strong>*bold*</strong>, <em>_italic_</em>
    </div>
  </div>

  <!-- Buttons -->
  <div class="field col-span-2">
    <!-- Show only if editing -->
    <Button
      label="Delete"
      style="textOnlyDestructive"
      onClick={() => {}}
      leftIcon={Trash}
      isAnimated={false}
    />
  </div>

  <div class="field col-span-4 flex justify-end gap-x-5">
    <Button label="Cancel" onClick={() => {}} style="secondary" isAnimated={false} />
    <Button label="Save" onClick={() => {}} />
  </div>
</form>
