{% if item.throws.length > 0 %}
  <h3>Throws</h3>

  <ul class="list-unstyled">
    {% for _throw in item.throws %}
      <li>{{ _throw | markdown }}</li>
    {% endfor %}
  </ul>
{% endif %}